import type { Config } from "@/types";

const CONFIG: Config = {
  // 각 옵션 자세한 설명은 README 참고
  profile: {
    name: "임대호(ian, daeho im)",
    profileImage: "https://avatars.githubusercontent.com/u/38205068?v=4",
    bio: "Solving problems through code.",
    repo: "im-ian/notion-blog",
    github: "im-ian",
    linkedin: "https://www.linkedin.com/in/daeho-im-36375b24a/",
    instagram: "https://www.instagram.com/daeh0_o/",
    twitter: undefined,
    threads: undefined,
  },
  notion: {
    blogPageId: process.env.NOTION_BLOG_PAGE_ID || "",
    viewId: process.env.NOTION_VIEW_ID || "",
  },
  meta: {
    title: {
      default: "다람쥐 헌 쳇바퀴에 타고파",
      template: "%s",
    },
    description: "Solving problems through code.",
    siteUrl: process.env.SITE_URL,
    ogImage: undefined,
  },
  site: {
    lang: "ko",
    title: "다람쥐 헌 쳇바퀴에 타고파",
    stickyProfile: false,
  },
  theme: {
    mode: "auto",
    showToggle: true,
  },
  search: {
    shortcut: true,
    scope: "all",
    showInHeader: true,
  },
  posts: {
    perPage: 10,
    paginationMode: "numbered",
    useScheduled: true,
    showSummary: true,
    showPrevNext: true,
    dateFormat: "YYYY년 MM월 DD일",
    showScrollProgress: true,
  },
  comments: {
    use: true,
  },
  rss: {
    use: true,
  },
  footer: {
    show: true,
    text: "© 임대호(ian, daeho im). All rights reserved.",
  },
  sentry: {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    dsn: process.env.SENTRY_DSN,
  },
  google: {
    googleSearchConsole: {
      siteVerification: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION,
    },
    ga: {
      id: process.env.GA_ID,
    },
  },
  naver: {
    naverSearchAdvisor: {
      siteVerification: process.env.NAVER_SEARCH_ADVISOR_VERIFICATION,
    },
  },
};

export default CONFIG;
