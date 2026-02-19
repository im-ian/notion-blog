import { unstable_cache } from "next/cache";
import { NotionAPI } from "notion-client";
import type {
  Block,
  BlockMap,
  CollectionMap,
  CollectionPropertySchemaMap,
  ExtendedRecordMap,
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
    return await api.getPage(pageId, {});
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
    schema,
    blocks: pageList
      .map((page) => ({
        role: page.role,
        value: {
          ...page.value,
          attributes: getPostAttribute(page.value, schema),
        },
      }))
      .filter(
        (page) =>
          page.value.attributes.slug.value &&
          (page.value.attributes.status.value === "Public" ||
            (process.env.NODE_ENV === "development" &&
              page.value.attributes.status.value === "Editing")),
      )
      .sort((a, b) => {
        const aDate = +new Date(a?.value?.attributes?.date?.value || 0);
        const bDate = +new Date(b?.value?.attributes?.date?.value || 0);

        return bDate - aDate;
      }),
  };

  return posts;
}

export async function getPost(slug: string): Promise<Post> {
  const posts = await getPosts();

  const filteredPosts = posts.blocks.find(
    (block) => block.value.attributes.slug.value === slug,
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
    const properties = getPostAttribute(page.value, schema);

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
    const tags = block.value.attributes.tags?.value?.split(",") || [];
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
  const query = getFirstId(collection_query);
  if (!query) return [];

  const block = getFirstId(collection_query[query]);
  if (!block) return [];

  return collection_query[query][block].collection_group_results?.blockIds;
}

export function getSchema(collection: CollectionMap) {
  return Object.values(collection)[0]?.value?.schema;
}

export function getPostList(block: BlockMap) {
  const blockIds = Object.keys(block);
  const blocks = blockIds.map((blockId) => block[blockId]);

  return blocks.filter((block) => block.value.type === "page");
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
