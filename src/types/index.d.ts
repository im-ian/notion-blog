import { Metadata } from "next";

type Profile = {
  github: string | undefined;
};

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

  ga: string | undefined;
};

type SentryConfig = {
  dsn: string | undefined;
  authToken: string | undefined;
};

export type Config = {
  profile: Profile;
  notion: NotionConfig;
  meta: Metadata;
  site: SiteConfig;
  sentry: SentryConfig;
};
