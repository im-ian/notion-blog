import type { Config } from "@/types";

const CONFIG: Config = {
  // 각 옵션 자세한 설명은 README 참고
  // 사이드바·헤더·댓글 등에 노출되는 작성자 정보
  profile: {
    name: "임대호(ian, daeho im)",
    profileImage: "https://avatars.githubusercontent.com/u/38205068?v=4",
    bio: "Solving problems through code.",
    // utterances 댓글용 owner/repo (미설정 시 댓글 비활성)
    repo: "im-ian/notion-blog",
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
      // title이 없는 페이지에서 사용되는 기본 타이틀
      default: "다람쥐 헌 쳇바퀴에 타고파",
      // title이 있는 페이지에 적용되는 포맷 (%s = 해당 페이지 title, 예: "%s | My Blog")
      template: "%s",
    },
    description: "Solving problems through code.",
    // sitemap·RSS·OG 베이스 URL (production 필수)
    siteUrl: process.env.SITE_URL,
    // 포스트 썸네일이 없을 때 fallback OG 이미지
    ogImage: undefined,
  },
  // 사이트 기본 정보 + 홈 레이아웃
  site: {
    lang: "ko",
    title: "다람쥐 헌 쳇바퀴에 타고파",
    // 데스크탑 좌측 프로필 스크롤 추종 여부
    stickyProfile: false,
  },
  // 다크모드 / 라이트모드 동작
  theme: {
    // 첫 방문 기본 테마 (사용자 토글 시 localStorage 우선)
    // auto: 시스템 설정 추종 | light: 라이트 고정 | dark: 다크 고정
    mode: "auto",
    // 헤더 다크모드 토글 버튼 노출
    showToggle: true,
  },
  // 검색 (Cmd/Ctrl+K)
  search: {
    // 단축키 활성화
    shortcut: true,
    // 검색 매칭 범위
    // title: 제목만 | title+summary: 제목+summary | all: 제목+summary+tags
    scope: "all",
    // 헤더 검색 아이콘 노출
    showInHeader: true,
  },
  // 포스트 리스트·상세 동작
  posts: {
    // 페이지당 포스트 개수 (1 미만이면 1로 보정)
    perPage: 10,
    // 페이지네이션 모드
    // infinite: 인피니티 스크롤 | numbered: 숫자 페이지 + Prev/Next (?page=N)
    paginationMode: "numbered",
    // 작성일 미래 포스트 숨김 (예약 게시)
    useScheduled: true,
    // 카드에 summary 노출
    showSummary: true,
    // 상세 페이지 하단 인접 포스트(이전/다음) 노출
    showPrevNext: true,
    // dayjs 토큰 (예: "YYYY-MM-DD", "YYYY/MM/DD HH:mm")
    dateFormat: "YYYY년 MM월 DD일",
    // 상세 페이지 상단 스크롤 진행바 노출
    showScrollProgress: true,
  },
  // utterances 댓글 (profile.repo 필요)
  comments: {
    // 댓글 영역 노출
    use: true,
  },
  // /rss.xml 피드 (meta.siteUrl 필요)
  rss: {
    // 피드 활성화 (false면 404)
    use: true,
  },
  // 사이트 전역 하단 영역
  footer: {
    // footer 노출
    show: true,
    text: "© 임대호(ian, daeho im). All rights reserved.",
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
