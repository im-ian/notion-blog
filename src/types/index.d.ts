import type { Metadata } from "next";

type Profile = {
  name: string;
  profileImage: string | undefined;
  bio: string | undefined;
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
  lang: string;
  title: string;
  useSearchShortcut: boolean;
  useScheduledPosts: boolean;
  useStickyProfile: boolean;
  defaultTheme: "auto" | "light" | "dark";
  useComments: boolean;
  useRssFeed: boolean;
  showThemeToggle: boolean;
  showScrollProgress: boolean;
  postsPerPage: number;
  paginationMode: "infinite" | "numbered";
};

type SentryConfig = {
  dsn: string | undefined;
  authToken: string | undefined;
};

type GoogleConfig = {
  googleSearchConsole: {
    siteVerification: string | undefined;
  };
  ga: {
    id: string | undefined;
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
