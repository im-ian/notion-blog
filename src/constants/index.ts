export const Routes = {
  Home: () => "/",
  Post: (slug: string) => `/post/${slug}`,
} as const;
