import { Metadata } from "next";

type Profile = {
  repo: string | undefined;
  github: string | undefined;
};

type NotionConfig = {
  blogPageId: string;
  viewId: string;
};

type SiteConfig = {
  title: string;
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
