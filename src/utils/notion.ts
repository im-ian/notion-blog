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

import type { Post, PostAttribute, Posts, PostTag } from "@/types/notion";
import { getOptionColor } from "./color";
import { getSiteConfig } from "./config";

const { blogPageId } = getSiteConfig("notion");

const TAGS_CACHE = new Set<PostTag>();

const api = new NotionAPI();

export const getPage = unstable_cache(
  async (pageId: string) => {
    return await api.getPage(pageId);
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
  const pageList = getPostList(pageContent.block);

  const posts: Posts = {
    schema: schema || {},
    blocks: pageList
      .map((page) => ({
        ...page,
        attributes: getPostAttribute(page, schema || {}),
      }))
      .filter(
        (page) =>
          page.attributes.slug.value &&
          (page.attributes.status.value === "Public" ||
            (process.env.NODE_ENV === "development" &&
              page.attributes.status.value === "Editing")),
      )
      .sort((a, b) => {
        const aDate = +new Date(a?.attributes?.date?.value || 0);
        const bDate = +new Date(b?.attributes?.date?.value || 0);

        return bDate - aDate;
      }),
  };

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

function unwrapRecord<T>(box: NotionMapBox<T> | undefined): T | undefined {
  if (!box) return undefined;
  const value = box.value;
  if (value && typeof value === "object" && "value" in value && "role" in value) {
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
  } catch (e) {
    console.log(e);
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
