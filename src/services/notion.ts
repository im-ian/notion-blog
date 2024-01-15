import { request } from ".";

import { Page, Pages } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";

const { postRevalidate } = getSiteConfig("site");

export async function getPosts<T>(
  slug?: T,
): Promise<T extends string ? Page : Pages> {
  const apiPath = slug ? `/api/notion/posts?slug=${slug}` : "/api/notion/posts";

  return await request(apiPath, {
    next: { revalidate: postRevalidate },
  }).then((res) => res.json());
}
