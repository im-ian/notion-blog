import { Metadata } from "next";

type NotionConfig = {
  pageId: string;
};

export type Config = {
  notion: NotionConfig;
  meta: Metadata;
};
