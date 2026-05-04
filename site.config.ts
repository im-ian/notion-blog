import type { Config } from "@/types";

const CONFIG: Config = {
  // Profile
  profile: {
    name: "임대호(ian, daeho im)",
    profileImage: "https://avatars.githubusercontent.com/u/38205068?v=4",
    bio: "Solving problems through code.",
    // 댓글 기능을 위한 레포명, 입력하지 않으면 댓글 기능이 비활성화됩니다.
    repo: "im-ian/notion-blog",
    // Github 유저 네임
    github: "im-ian",
    // linkedin 주소
    linkedin: "https://www.linkedin.com/in/daeho-im-36375b24a/",
    // instagram 주소
    instagram: "https://www.instagram.com/daeh0_o/",
  },
  // Notion
  notion: {
    blogPageId: process.env.NOTION_BLOG_PAGE_ID || "",
    viewId: process.env.NOTION_VIEW_ID || "",
  },
  // Metadata
  meta: {
    title: {
      default: "다람쥐 헌 쳇바퀴에 타고파",
      template: "%s",
    },
    description: "Solving problems through code.",
  },
  // 각 옵션 자세한 설명은 README 참고
  site: {
    lang: "ko",
    title: "다람쥐 헌 쳇바퀴에 타고파",
    useSearchShortcut: true,
    useScheduledPosts: true,
    useStickyProfile: false,
    defaultTheme: "auto",
    useComments: true,
    useRssFeed: true,
    showThemeToggle: true,
    showScrollProgress: true,
    postsPerPage: 10,
    paginationMode: "numbered",
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
