import { PageProperties } from "@/types/notion";
import {
  BlockMap,
  CollectionMap,
  CollectionPropertySchemaMap,
  Decoration,
  ExtendedRecordMap,
} from "notion-types";
import { getDateValue, getTextContent } from "notion-utils";

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

export function getPages(block: BlockMap) {
  const blockIds = Object.keys(block);
  const blocks = blockIds.map((blockId) => block[blockId]);

  return blocks.filter((block) => block.value.type === "page");
}

export function getPageProperties(
  properties: Record<string, Decoration[]>,
  scheme: CollectionPropertySchemaMap
): PageProperties {
  /*
    Properties
    {
      'NX\\Q': [ [ '‣', [Array] ] ],
      '`gQ~': [ [ 'Post' ] ],
      'd]hq': [ [ 'react-detect-localstorage-change' ] ],
      ppED: [ [ '💻 Frontend' ] ],
      'sD^m': [ [ 'React' ] ],
      'wz|S': [ [ '로컬 스토리지의 값이 변경되면 이벤트를 실행시켜보자' ] ],
      '~rC=': [ [ '‣', [Array] ] ],
      title: [ [ 'localStorage 값 변경 감지하기' ] ],
      'f211bdc0-ee00-4186-9a7d-f68c055ec2ee': [ [ 'Public' ] ]
    }
  */
  /*
    Scheme
    {
      'NX\\Q': { name: 'date', type: 'date' },
      WxpT: { name: 'thumbnail', type: 'file' },
      '`gQ~': { name: 'type', type: 'select', options: [ [Object], [Object] ] },
    }
  */

  const result: PageProperties = {};

  for (const data of Object.entries(scheme)) {
    if (!data) continue;

    const [id, { name, type }] = data;

    const decoration = properties[id];
    let value = null;

    if (type === "date") {
      const date = getDateValue(decoration);
      value = date?.start_date;
    } else {
      value = getTextContent(decoration);
    }

    result[name] = { type, id, value };
  }

  return result;
}
