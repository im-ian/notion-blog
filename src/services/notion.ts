import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

import { Pages } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPageAttribute, getPageList, getSchema } from "@/utils/notion";

const { pageId: PAGE_ID } = getSiteConfig("notion");
const api = new NotionAPI();

const pageContentCache: Map<string, ExtendedRecordMap> = new Map();

export async function getPageContent(pageId: string = PAGE_ID) {
  if (!pageContentCache.has(pageId)) {
    pageContentCache.set(pageId, await api.getPage(pageId, {}));
  }

  return pageContentCache.get(pageId);
}

let pageCache: Pages | null = null;

export async function getPages() {
  if (pageCache) return pageCache;

  const pageContent = await getPageContent();

  if (!pageContent) {
    pageCache = null;
    return null;
  }

  const schema = getSchema(pageContent.collection);
  const pageList = getPageList(pageContent.block);

  console.log("#", schema);

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
      .sort((a, b) => {
        const aDate = +new Date(a?.value?.attributes?.date?.value || 0);
        const bDate = +new Date(b?.value?.attributes?.date?.value || 0);

        return bDate - aDate;
      }),
  };

  pageCache = pages;

  return pages;
}
