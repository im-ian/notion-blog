import { NotionAPI } from "notion-client";
import {
  BlockMap,
  CollectionMap,
  CollectionPropertySchemaMap,
  Decoration,
  ExtendedRecordMap,
} from "notion-types";
import { getDateValue, getTextContent } from "notion-utils";

import { PageAttribute, Pages } from "@/types/notion";

const api = new NotionAPI();

export async function getBlockById(blockId: string) {
  return await api.getPage(blockId, {});
}

export async function getPages(pageId: string) {
  const pageContent = await api.getPage(pageId, {});

  if (!pageContent) return null;

  const schema = getSchema(pageContent.collection);
  const pageList = getPageList(pageContent.block);

  const pages: Pages = {
    schema,
    pages: pageList
      .map((page) => ({
        role: page.role,
        value: {
          ...page.value,
          attributes: getPageAttribute(page.value.properties, schema),
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

  return pages;
}

function getFirstId(block: Record<string, unknown>) {
  return Object.keys(block)[0];
}

export function getPageIds({ collection_query }: ExtendedRecordMap) {
  const query = getFirstId(collection_query);
  if (!query) return [];

  const block = getFirstId(collection_query[query]);
  if (!block) return [];

  return collection_query[query][block].collection_group_results?.blockIds;
}

export function getSchema(collection: CollectionMap) {
  return Object.values(collection)[0]?.value?.schema;
}

export function getPageList(block: BlockMap) {
  const blockIds = Object.keys(block);
  const blocks = blockIds.map((blockId) => block[blockId]);

  return blocks.filter((block) => block.value.type === "page");
}

export function getPageAttribute(
  properties: Record<string, Decoration[]>,
  schema: CollectionPropertySchemaMap,
): PageAttribute {
  const result: PageAttribute = {};

  for (const data of Object.entries(schema)) {
    if (!data) continue;

    const [id, { name, type, ...options }] = data;

    const decoration = properties?.[id];
    let value: string | undefined;

    if (type === "date") {
      const date = getDateValue(decoration);
      value = date?.start_date;
    } else {
      value = getTextContent(decoration);
    }

    result[name] = { type, id, value, ...options };
  }

  return result;
}
