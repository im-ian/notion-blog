import { revalidateTag } from "next/cache";

import { request } from ".";

import { CacheKey } from "@/constants";
import { Page, PageCategory, Pages } from "@/types/notion";
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

      revalidateTag(CacheKey.Posts);
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

      revalidateTag(CacheKey.Posts);
      return {
        schema: {},
        page: {},
      } as Page;
    });
}

export async function getCategories(): Promise<PageCategory[]> {
  return await request(`/api/notion/posts/categories`, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Categories] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      revalidateTag(CacheKey.Categories);
      return [];
    });
}

export async function getPostsByCategory(category: string): Promise<Pages> {
  return await request(`/api/notion/posts/category?category=${category}`, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Posts] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      revalidateTag(CacheKey.Posts);
      return {
        schema: {},
        pages: [],
      } as Pages;
    });
}
