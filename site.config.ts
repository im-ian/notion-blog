import type { Config } from "@/types";

const CONFIG: Config = {
  notion: {
    pageId: process.env.NOTION_PAGE_ID || "",
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
    domain: {
      dev: process.env.DEV_URL || "",
      prod: process.env.PROD_URL || "",
    },
    // 포스트 캐시 갱신 시간
    postRevalidate: 60 * 60, // 1 hour
    // 검색 단축키 사용 여부
    useSearchShortcut: true,
    // Google Analytics Tracking ID
    ga: process.env.GA_ID,
  },
};

export default CONFIG;
