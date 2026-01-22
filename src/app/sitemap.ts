import type { MetadataRoute } from "next";

import { getPosts } from "@/utils/notion";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";

  const postEntries = posts.blocks
    .filter(
      (post) =>
        post.value.attributes.slug.value &&
        post.value.attributes.status.value === "Public",
    )
    .map((post) => ({
      url: `${baseUrl}/post/${post.value.attributes.slug.value}`,
      lastModified: new Date(post.value.attributes.date.value || Date.now()),
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
