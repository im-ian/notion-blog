export const Routes = {
  Home: () => "/",
  Post: (slug: string) => `/post/${slug}`,
  Tag: (tag?: string) => (tag ? `/tags/${tag}` : "/tags"),
} as const;

export const NotionColorMap = {
  gray: "#e0e0e0",
  brown: "#bcaaa4",
  orange: "#ffcc80",
  yellow: "#fff59d",
  green: "#a5d6a7",
  blue: "#90caf9",
  purple: "#b39ddb",
  pink: "#f48fb1",
  red: "#ef9a9a",
} as const;

export const CacheKey = {
  Posts: "posts",
  Tags: "tags",
};
