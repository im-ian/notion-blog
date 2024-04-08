import type { Config } from "@/types";

const CONFIG: Config = {
  // Profile
  profile: {
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
    description: "My Blog Description",
  },
  site: {
    title: "다람쥐 헌 쳇바퀴에 타고파",
    // 포스트 캐시 갱신 시간
    postRevalidate: 60 * 60, // 1 hour
    // 검색 단축키 사용 여부
    useSearchShortcut: true,
    // Google Analytics Tracking ID
    ga: process.env.GA_ID,
  },
  sentry: {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    dsn: process.env.SENTRY_DSN,
  },
};

export default CONFIG;
