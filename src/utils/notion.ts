import {
  BlockMap,
  CollectionMap,
  CollectionPropertySchemaMap,
  Decoration,
  ExtendedRecordMap,
  SelectOption,
} from "notion-types";
import { getDateValue, getTextContent } from "notion-utils";

import { NotionColorMap } from "@/constants";
import { PageAttribute } from "@/types/notion";

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
  scheme: CollectionPropertySchemaMap,
): PageAttribute {
  const result: PageAttribute = {};

  for (const data of Object.entries(scheme)) {
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

export function getOptionColor({
  value,
  options,
}: {
  value: string | undefined;
  options: SelectOption[] | undefined;
}) {
  if (!value || !options) return undefined;

  const option = options.find((option) => option.value === value);
  if (!option) return undefined;

  return NotionColorMap[option.color];
}
