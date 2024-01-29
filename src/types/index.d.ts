import { Metadata } from "next";

type NotionConfig = {
  pageId: string;
  viewId: string;
};

type SiteConfig = {
  title: string;
  domain: {
    dev: string;
    prod: string;
  };
  postRevalidate: false | number;
  useSearchShortcut: boolean;
};

export type Config = {
  notion: NotionConfig;
  meta: Metadata;
  site: SiteConfig;
};
