import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

const api = new NotionAPI();

const cache: Map<string, Promise<ExtendedRecordMap>> = new Map();

export function getPage(pageId: string) {
  if (!cache.has(pageId)) {
    cache.set(pageId, api.getPage(pageId));
  }

  return cache.get(pageId);
}
