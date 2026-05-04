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
  site: {
    lang: "ko",
    title: "다람쥐 헌 쳇바퀴에 타고파",
    // 검색 단축키 사용 여부
    useSearchShortcut: true,
    // 예약 게시 사용 여부
    // true: Public 포스트가 작성일을 넘어가야 리스트에 노출 (기본값)
    // false: Public 포스트가 작성일과 무관하게 노출
    useScheduledPosts: true,
    // 메인 페이지의 PC(데스크탑) 좌측 프로필 섹션 sticky 여부
    // true: 스크롤 시 프로필 섹션이 따라다님
    // false: 최상단에 고정 (기본값)
    useStickyProfile: false,
    // 기본 테마 모드
    // "auto": 시스템 설정을 따름 (기본값)
    // "light": 라이트 모드 고정
    // "dark": 다크 모드 고정
    // 사용자가 토글로 직접 변경한 경우 localStorage 값이 우선
    defaultTheme: "auto",
    // 댓글(utterances) 사용 여부 (profile.repo가 있을 때만 동작)
    // true: 댓글 영역 노출 (기본값)
    // false: 댓글 영역 비활성
    useComments: true,
    // RSS 피드 활성화 여부 (/rss.xml)
    // true: 피드 노출 (기본값, SITE_URL 환경변수 필요)
    // false: 404 응답
    useRssFeed: true,
    // 헤더의 다크모드 토글 버튼 노출 여부
    // true: 노출 (기본값)
    // false: 숨김 (defaultTheme을 강제하고 싶을 때 유용)
    showThemeToggle: true,
    // 포스트 페이지 상단 스크롤 진행바 노출 여부
    // true: 노출 (기본값)
    // false: 숨김
    showScrollProgress: true,
    // Google Analytics Tracking ID
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
