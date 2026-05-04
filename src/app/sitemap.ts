import type { MetadataRoute } from "next";

import { PostStatus } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPosts } from "@/utils/notion";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const { siteUrl } = getSiteConfig("meta");

  if (process.env.NODE_ENV === "production" && !siteUrl) {
    throw new Error(
      "meta.siteUrl (or SITE_URL env) is required for sitemap generation in production",
    );
  }

  const baseUrl = siteUrl || "http://localhost:3000";

  const postEntries = posts.blocks
    .filter(
      (post) =>
        post.attributes.slug.value &&
        post.attributes.status.value === PostStatus.Public,
    )
    .map((post) => ({
      url: `${baseUrl}/post/${post.attributes.slug.value}`,
      lastModified: new Date(post.attributes.date.value || Date.now()),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...postEntries,
  ];
}
