import type { Config } from "@/types";

const CONFIG: Config = {
  // 각 옵션 자세한 설명은 README 참고
  // 사이드바·헤더·댓글 등에 노출되는 작성자 정보
  profile: {
    name: "임대호(ian, daeho im)",
    profileImage: "https://avatars.githubusercontent.com/u/38205068?v=4",
    bio: "Solving problems through code.",
    repo: "im-ian/notion-blog", // utterances 댓글용 owner/repo
    github: "im-ian",
    linkedin: "https://www.linkedin.com/in/daeho-im-36375b24a/",
    instagram: "https://www.instagram.com/daeh0_o/",
    twitter: undefined,
    threads: undefined,
  },
  // Notion DB 식별자 (env로 주입)
  notion: {
    blogPageId: process.env.NOTION_BLOG_PAGE_ID || "",
    viewId: process.env.NOTION_VIEW_ID || "",
  },
  // SEO/Metadata 전역 기본값
  meta: {
    title: {
      default: "다람쥐 헌 쳇바퀴에 타고파",
      template: "%s",
    },
    description: "Solving problems through code.",
    siteUrl: process.env.SITE_URL, // sitemap·RSS·OG 베이스 URL
    ogImage: undefined, // 포스트 썸네일 없을 때 fallback
  },
  // 사이트 기본 정보 + 홈 레이아웃
  site: {
    lang: "ko",
    title: "다람쥐 헌 쳇바퀴에 타고파",
    stickyProfile: false, // 데스크탑 좌측 프로필 스크롤 추종
  },
  // 다크모드 / 라이트모드 동작
  theme: {
    mode: "auto", // "auto" | "light" | "dark"
    showToggle: true, // 헤더 토글 버튼 노출
  },
  // 검색 (Cmd/Ctrl+K)
  search: {
    shortcut: true,
    scope: "all", // "title" | "title+summary" | "all"
    showInHeader: true,
  },
  // 포스트 리스트·상세 동작
  posts: {
    perPage: 10,
    paginationMode: "numbered", // "infinite" | "numbered"
    useScheduled: true, // 작성일 미래 포스트 숨김 (예약 게시)
    showSummary: true, // 카드에 summary 노출
    showPrevNext: true, // 상세 페이지 인접 포스트 노출
    dateFormat: "YYYY년 MM월 DD일", // dayjs 토큰
    showScrollProgress: true,
  },
  // utterances 댓글 (profile.repo 필요)
  comments: {
    use: true,
  },
  // /rss.xml 피드 (meta.siteUrl 필요)
  rss: {
    use: true,
  },
  // 사이트 전역 하단 영역
  footer: {
    show: true,
    text: "© 임대호(ian, daeho im). All rights reserved.",
  },
  // 에러/성능 모니터링 (4개 env 모두 있어야 활성)
  sentry: {
    authToken: process.env.SENTRY_AUTH_TOKEN,
    dsn: process.env.SENTRY_DSN,
  },
  // Google Search Console + Analytics
  google: {
    googleSearchConsole: {
      siteVerification: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION,
    },
    ga: {
      id: process.env.GA_ID,
    },
  },
  // Naver Search Advisor
  naver: {
    naverSearchAdvisor: {
      siteVerification: process.env.NAVER_SEARCH_ADVISOR_VERIFICATION,
    },
  },
};

export default CONFIG;
