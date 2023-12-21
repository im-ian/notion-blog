import type { Config } from "@/types";

const CONFIG: Config = {
  notion: {
    pageId: process.env.NOTION_PAGE_ID || "",
  },
  // Metadata
  meta: {
    title: {
      default: "다람쥐 헌 쳇바퀴에 타고파",
      template: "다람쥐 %s에 타고파",
    },
    description: "My Blog Description",
  },
};

export default CONFIG;
