import { request } from ".";

import { Page, PageCategory, Pages } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";

const { postRevalidate } = getSiteConfig("site");

export async function getPosts(): Promise<Pages> {
  const apiPath = `/api/notion/posts`;

  return await request(apiPath, {
    next: { revalidate: postRevalidate },
  }).then((res) => res.json());
}

export async function getPost<T>(slug: T): Promise<Page> {
  const apiPath = `/api/notion/posts/slug?slug=${slug}`;

  return await request(apiPath, {
    next: { revalidate: postRevalidate },
  }).then((res) => res.json());
}

export async function getCategories(): Promise<PageCategory[]> {
  return await request(`/api/notion/posts/categories`, {
    next: { revalidate: postRevalidate },
  }).then((res) => res.json());
}

export async function getPostsByCategory(category: string): Promise<Pages> {
  return await request(`/api/notion/posts/category?category=${category}`, {
    next: { revalidate: postRevalidate },
  }).then((res) => res.json());
}
