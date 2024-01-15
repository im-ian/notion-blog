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
      template: "다람쥐 %s에 타고파",
    },
    description: "My Blog Description",
  },
  site: {
    title: "다람쥐 헌 쳇바퀴에 타고파",
    postRevalidate: 60 * 5, // 5 minutes
    domain: {
      dev: process.env.DEV_URL || "",
      prod: process.env.PROD_URL || "",
    },
  },
};

export default CONFIG;
