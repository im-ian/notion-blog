import { Metadata } from "next";

type Profile = {
  repo: string | undefined;
  github: string | undefined;
  linkedin: string | undefined;
  instagram: string | undefined;
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

type GoogleConfig = {
  googleSearchConsole: {
    siteVerification: string | undefined;
  };
};

type NaverConfig = {
  naverSearchAdvisor: {
    siteVerification: string | undefined;
  };
};

export type Config = {
  profile: Profile;
  notion: NotionConfig;
  meta: Metadata;
  site: SiteConfig;
  sentry: SentryConfig;
  google: GoogleConfig;
  naver: NaverConfig;
};
