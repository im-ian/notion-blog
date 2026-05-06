import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";
import type {
  Block,
  BlockMap,
  CollectionMap,
  CollectionPropertySchemaMap,
  ExtendedRecordMap,
  NotionMapBox,
} from "notion-types";
import { getDateValue, getTextContent } from "notion-utils";

import {
  type Post,
  type PostAttribute,
  PostStatus,
  type Posts,
  type PostTag,
} from "@/types/notion";
import { getOptionColor } from "./color";
import { getSiteConfig } from "./config";

const { blogPageId, viewId, useViewIdFilter } = getSiteConfig("notion");
const {
  useScheduled: useScheduledPosts,
  perPage: postsPerPage,
  paginationMode,
} = getSiteConfig("posts");

export type PaginationInfo = {
  mode: "infinite" | "numbered";
  pageSize: number;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  basePath: string;
};

export function paginatePosts(
  posts: Posts,
  pageParam: string | string[] | undefined,
  basePath: string,
): { posts: Posts; pagination: PaginationInfo } {
  const pageSize = Math.max(1, postsPerPage);
  const totalCount = posts.blocks.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const rawPage = Array.isArray(pageParam) ? pageParam[0] : pageParam;
  const parsed = Number.parseInt(rawPage ?? "", 10);
  const requestedPage = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const currentPage = Math.min(requestedPage, totalPages);

  if (paginationMode === "infinite") {
    return {
      posts,
      pagination: {
        mode: "infinite",
        pageSize,
        currentPage: 1,
        totalPages,
        totalCount,
        basePath,
      },
    };
  }

  const start = (currentPage - 1) * pageSize;
  const slicedBlocks = posts.blocks.slice(start, start + pageSize);

  return {
    posts: {
      schema: posts.schema,
      blocks: slicedBlocks,
    },
    pagination: {
      mode: "numbered",
      pageSize,
      currentPage,
      totalPages,
      totalCount,
      basePath,
    },
  };
}

const TAGS_CACHE = new Set<PostTag>();

const api = new NotionAPI();

const inflight = new Map<string, Promise<ExtendedRecordMap>>();

async function fetchPageWithRetry(
  pageId: string,
  maxRetries = 3,
): Promise<ExtendedRecordMap> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await api.getPage(pageId);
    } catch (error: any) {
      const is429 =
        error?.message?.includes("429") ||
        error?.statusCode === 429 ||
        error?.code === 429;

      if (is429 && attempt < maxRetries) {
        const delay = 2 ** attempt * 1000 + Math.random() * 500;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error(`Failed to fetch page ${pageId} after ${maxRetries} retries`);
}

function deduplicatedFetch(pageId: string): Promise<ExtendedRecordMap> {
  const existing = inflight.get(pageId);
  if (existing) return existing;

  const promise = fetchPageWithRetry(pageId).finally(() => {
    inflight.delete(pageId);
  });
  inflight.set(pageId, promise);
  return promise;
}

export const getPage = unstable_cache(
  async (pageId: string) => {
    return await deduplicatedFetch(pageId);
  },
  ["notion-page"],
  { revalidate: 600 }, // 10 minutes
);

export async function getBlockByPageId(pageId: string) {
  return await getPage(pageId);
}

export async function getPosts(pageId: string = blogPageId) {
  const pageContent = await getPage(pageId);

  if (!pageContent)
    return {
      schema: {},
      blocks: [],
    };

  const schema = getSchema(pageContent.collection);

  // useViewIdFilter=true 이고 viewId가 record map에 존재하면 view 결과로 대체.
  // 그렇지 않으면(false 또는 viewId 누락/오류) 모든 page block을 끌어오고 코드 측 필터를 적용.
  const viewList =
    useViewIdFilter && viewId
      ? getPostListByView(pageContent, viewId)
      : null;

  if (useViewIdFilter && viewId && viewList === null) {
    console.warn(
      `[notion] useViewIdFilter=true이지만 viewId='${viewId}'를 record map에서 찾지 못해 기본 동작으로 fallback합니다.`,
    );
  }

  const usingView = viewList !== null;
  const pageList = viewList ?? getPostList(pageContent.block);

  const posts: Posts = {
    schema: schema || {},
    blocks: pageList
      .map((page) => ({
        ...page,
        attributes: getPostAttribute(page, schema || {}),
      }))
      // slug 누락된 row만 제외. 나머지 노출 규칙은 view 모드일 때 view에 위임.
      .filter((page) => {
        if (!page.attributes.slug.value) return false;
        if (usingView) return true;
        const status = page.attributes.status.value;
        return (
          status === PostStatus.Public ||
          (process.env.NODE_ENV === "development" &&
            status === PostStatus.Editing)
        );
      })
      .filter((page) => {
        if (usingView) return true;
        if (!useScheduledPosts) return true;
        if (page.attributes.status.value !== PostStatus.Public) return true;
        const dateValue = page.attributes?.date?.value;
        if (!dateValue) return true;
        const postDate = new Date(dateValue).getTime();
        if (Number.isNaN(postDate)) return true;
        return postDate <= Date.now();
      }),
  };

  // view 모드면 view의 정렬을 그대로 신뢰. 기본 모드는 작성일 desc로 직접 정렬.
  if (!usingView) {
    posts.blocks.sort((a, b) => {
      const aDate = +new Date(a?.attributes?.date?.value || 0);
      const bDate = +new Date(b?.attributes?.date?.value || 0);
      return bDate - aDate;
    });
  }

  return posts;
}

export async function getPost(slug: string): Promise<Post> {
  const posts = await getPosts();

  const filteredPosts = posts.blocks.find(
    (block) => block.attributes.slug.value === slug,
  );

  if (!filteredPosts) {
    return {
      schema: posts.schema,
      block: {},
    } as Post;
  }

  return {
    schema: posts.schema,
    block: filteredPosts,
  };
}

export type AdjacentPosts = {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
};

export async function getAdjacentPosts(slug: string): Promise<AdjacentPosts> {
  const posts = await getPosts();
  const index = posts.blocks.findIndex(
    (block) => block.attributes.slug.value === slug,
  );

  if (index === -1) return { prev: null, next: null };

  // posts.blocks는 작성일 desc 정렬. 더 최신 = index 작음, 더 이전 = index 큼.
  // UX: prev = 더 최신, next = 더 오래된 — 다른 정의도 가능하지만 인접 인덱스 그대로 사용.
  const prevBlock = posts.blocks[index - 1];
  const nextBlock = posts.blocks[index + 1];

  const toLink = (block?: Posts["blocks"][number]) => {
    if (!block) return null;
    const slugValue = block.attributes.slug.value;
    const titleValue = block.attributes.title?.value;
    if (!slugValue) return null;
    return { slug: slugValue, title: titleValue || slugValue };
  };

  return {
    prev: toLink(prevBlock),
    next: toLink(nextBlock),
  };
}

export async function getTags() {
  if (TAGS_CACHE.size) return Array.from(TAGS_CACHE);

  const { schema, blocks } = await getPosts();

  if (!blocks) return [];

  const tagSet = new Set<string>();
  const result: PostTag[] = [];

  blocks.forEach((page) => {
    const properties = getPostAttribute(page, schema);

    const tags = properties.tags?.value?.split(",") || [];

    tags.forEach((tag) => {
      const color = getOptionColor({
        value: tag,
        options: properties.tags.options,
      });

      if (tags.length) {
        if (tagSet.has(tag)) {
          const targetTag = result.find((c) => c.name === tag);
          if (targetTag) {
            targetTag.postCount += 1;
          }
        } else {
          result.push({
            name: tag,
            postCount: 1,
            color,
          });
          tagSet.add(tag);
        }
      }
    });
  });

  TAGS_CACHE.clear();
  result.forEach((tag) => {
    TAGS_CACHE.add(tag);
  });

  return result;
}

export async function getPostsByTag(tag: string) {
  const posts = await getPosts();

  const filteredPosts = posts.blocks.filter((block) => {
    const tags = block.attributes.tags?.value?.split(",") || [];
    return tags.includes(tag);
  });

  return {
    schema: posts.schema,
    blocks: filteredPosts,
  };
}

function getFirstId(block: Record<string, unknown>) {
  return Object.keys(block)[0];
}

export function getBlockIds({ collection_query }: ExtendedRecordMap) {
  const query = getFirstId(collection_query || {});
  if (!query) return [];

  const blockBox = collection_query?.[query];
  if (!blockBox) return [];

  const blockId = getFirstId(blockBox);
  if (!blockId) return [];

  const result = blockBox[blockId];
  return result?.collection_group_results?.blockIds;
}

export function getSchema(collection: CollectionMap) {
  const firstCollection = Object.values(collection || {})[0];
  return unwrapRecord(firstCollection)?.schema;
}

export function getPostList(block: BlockMap) {
  const blocks = Object.values(block || {})
    .map((b) => unwrapRecord(b))
    .filter((b): b is Block => !!b);

  return blocks.filter((b) => b.type === "page");
}

// 지정된 viewId의 collection_query 결과(필터/정렬 적용)를 그대로 페이지 블록 배열로 반환.
// viewId가 record map에 없으면 null을 반환해 호출자가 fallback 처리하도록 함.
export function getPostListByView(
  record: ExtendedRecordMap,
  targetViewId: string,
): Block[] | null {
  if (!targetViewId) return null;

  const collection = unwrapRecord(Object.values(record.collection || {})[0]);
  const collectionId = collection?.id;
  if (!collectionId) return null;

  const queryView = record.collection_query?.[collectionId]?.[targetViewId];
  if (!queryView) return null;

  const ids = queryView.collection_group_results?.blockIds;
  if (!ids) return null;

  return ids
    .map((id) => unwrapRecord(record.block[id]))
    .filter((b): b is Block => !!b && b.type === "page");
}

function unwrapRecord<T>(box: NotionMapBox<T> | undefined): T | undefined {
  if (!box) return undefined;
  const value = box.value;
  if (
    value &&
    typeof value === "object" &&
    "value" in value &&
    "role" in value
  ) {
    return (value as any).value;
  }
  return value as T;
}

export function getPostAttribute(
  block: Block,
  schema: CollectionPropertySchemaMap,
): PostAttribute {
  const result: PostAttribute = {};

  for (const data of Object.entries(schema)) {
    if (!data) continue;

    const [id, { name, type, ...options }] = data;

    const decoration = block.properties?.[id];
    let value: string | undefined;

    if (type === "date") {
      const date = getDateValue(decoration);
      value = date?.start_date;
    } else if (type === "file") {
      value = undefined;
      if (decoration) {
        const imageUrl = decoration[0][1]?.[0]?.[1];
        value = getMapImageUrl(imageUrl, block) || undefined;
      } else {
        value = undefined;
      }
    } else {
      value = getTextContent(decoration);
    }

    result[name] = { type, id, value, ...options };
  }

  return result;
}

// code by react-notion-x
// Imported from `react-notion-x/build/index.js` due to SSR issue
export function getMapImageUrl(url: string, block: Block) {
  if (!url) {
    return null;
  }
  if (url.startsWith("data:")) {
    return url;
  }
  if (url.startsWith("https://images.unsplash.com")) {
    return url;
  }
  try {
    const u = new URL(url);
    if (
      u.pathname.startsWith("/secure.notion-static.com") &&
      u.hostname.endsWith(".amazonaws.com")
    ) {
      if (
        u.searchParams.has("X-Amz-Credential") &&
        u.searchParams.has("X-Amz-Signature") &&
        u.searchParams.has("X-Amz-Algorithm")
      ) {
        return url;
      }
    }
  } catch {
    // URL 파싱 실패 시 아래 fallback 로직으로 진행
  }

  if (url.startsWith("/images")) {
    url = `https://www.notion.so${url}`;
  }
  url = `https://www.notion.so${
    url.startsWith("/image") ? url : `/image/${encodeURIComponent(url)}`
  }`;
  const notionImageUrlV2 = new URL(url);
  let table = block.parent_table === "space" ? "block" : block.parent_table;
  if (table === "collection" || table === "team") {
    table = "block";
  }
  notionImageUrlV2.searchParams.set("table", table);
  notionImageUrlV2.searchParams.set("id", block.id);
  notionImageUrlV2.searchParams.set("cache", "v2");
  url = notionImageUrlV2.toString();
  return url;
}
