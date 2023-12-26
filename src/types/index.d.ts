import { Metadata } from "next";

type NotionConfig = {
  pageId: string;
  viewId: string;
};

export type Config = {
  notion: NotionConfig;
  meta: Metadata;
};
