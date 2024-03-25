import { NotionAPI } from "notion-client";
import {
  Block,
  BlockMap,
  CollectionMap,
  CollectionPropertySchemaMap,
  ExtendedRecordMap,
} from "notion-types";
import { getDateValue, getTextContent } from "notion-utils";

import { PostAttribute, Posts } from "@/types/notion";

const api = new NotionAPI();

export async function getBlockById(blockId: string) {
  return await api.getPage(blockId, {});
}

export async function getPosts(pageId: string) {
  const pageContent = await api.getPage(pageId, {});

  if (!pageContent) return null;

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
          page.value.attributes.status.value === "Public",
      )
      .sort((a, b) => {
        const aDate = +new Date(a?.value?.attributes?.date?.value || 0);
        const bDate = +new Date(b?.value?.attributes?.date?.value || 0);

        return bDate - aDate;
      }),
  };

  return posts;
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
