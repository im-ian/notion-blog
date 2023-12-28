import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

const api = new NotionAPI();

const cache: Map<string, ExtendedRecordMap> = new Map();

export async function getPageContent(pageId: string) {
  if (!cache.has(pageId)) {
    cache.set(pageId, await api.getPage(pageId, {}));
  }

  return cache.get(pageId);
}
