import { revalidateTag } from "next/cache";

import { request } from ".";

import { CacheKey } from "@/constants";
import { Post, PostTag, Posts } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";

const { postRevalidate } = getSiteConfig("site");

export async function getPosts(): Promise<Posts> {
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
        blocks: [],
      } as Posts;
    });
}

export async function getPost<T>(slug: T): Promise<Post> {
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
        block: {},
      } as Post;
    });
}

export async function getTags(): Promise<PostTag[]> {
  return await request(`/api/notion/posts/tags`, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Tags] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      revalidateTag(CacheKey.Tags);
      return [];
    });
}

export async function getPostsByTag(tag: string): Promise<Posts> {
  return await request(`/api/notion/posts/tag?tag=${tag}`, {
    next: { revalidate: postRevalidate, tags: [CacheKey.Posts] },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);

      revalidateTag(CacheKey.Posts);
      return {
        schema: {},
        blocks: [],
      } as Posts;
    });
}
