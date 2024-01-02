import { Metadata } from "next";

type NotionConfig = {
  pageId: string;
  viewId: string;
};

type SiteConfig = {
  title: string;
};

export type Config = {
  notion: NotionConfig;
  meta: Metadata;
  site: SiteConfig;
};
