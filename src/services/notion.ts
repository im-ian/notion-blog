import { request } from ".";

import { CacheKey } from "@/constants";
import { Page, PageTag, Pages } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";

const { postRevalidate } = getSiteConfig("site");

export async function getPosts(): Promise<Pages> {
  const apiPath = `/api/notion/posts`;

  return await request(apiPath, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Posts] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      return {
        schema: {},
        pages: [],
      } as Pages;
    });
}

export async function getPost<T>(slug: T): Promise<Page> {
  const apiPath = `/api/notion/posts/slug?slug=${slug}`;

  return await request(apiPath, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Posts] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      return {
        schema: {},
        page: {},
      } as Page;
    });
}

export async function getTags(): Promise<PageTag[]> {
  return await request(`/api/notion/posts/tags`, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Tags] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      return [];
    });
}

export async function getPostsByTag(tag: string): Promise<Pages> {
  return await request(`/api/notion/posts/tag?tag=${tag}`, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Posts] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      return {
        schema: {},
        pages: [],
      } as Pages;
    });
}
