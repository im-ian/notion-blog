import type { Metadata } from "next";

type Profile = {
  name: string;
  profileImage: string | undefined;
  bio: string | undefined;
  repo: string | undefined;
  github: string | undefined;
  linkedin: string | undefined;
  instagram: string | undefined;
  twitter: string | undefined;
  threads: string | undefined;
};

type NotionConfig = {
  blogPageId: string;
  viewId: string;
  useViewIdFilter: boolean;
};

type MetaConfig = Metadata & {
  siteUrl?: string;
  ogImage?: string;
};

type SiteConfig = {
  lang: string;
  title: string;
  stickyProfile: boolean;
};

type ThemeConfig = {
  mode: "auto" | "light" | "dark";
  showToggle: boolean;
};

type SearchConfig = {
  shortcut: boolean;
  scope: "title" | "title+summary" | "all";
  showInHeader: boolean;
};

type PostsConfig = {
  perPage: number;
  paginationMode: "infinite" | "numbered";
  useScheduled: boolean;
  showSummary: boolean;
  showPrevNext: boolean;
  dateFormat: string;
  showScrollProgress: boolean;
};

type CommentsConfig = {
  use: boolean;
};

type RssConfig = {
  use: boolean;
};

type FooterConfig = {
  show: boolean;
  text: string;
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
  meta: MetaConfig;
  site: SiteConfig;
  theme: ThemeConfig;
  search: SearchConfig;
  posts: PostsConfig;
  comments: CommentsConfig;
  rss: RssConfig;
  footer: FooterConfig;
  google: GoogleConfig;
  naver: NaverConfig;
};
