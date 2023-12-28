import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

import { getSiteConfig } from "@/utils/config";

const { pageId: PAGE_ID } = getSiteConfig("notion");
const api = new NotionAPI();

const cache: Map<string, ExtendedRecordMap> = new Map();

export async function getPageContent(pageId: string = PAGE_ID) {
  if (!cache.has(pageId)) {
    cache.set(pageId, await api.getPage(pageId, {}));
  }

  return cache.get(pageId);
}
