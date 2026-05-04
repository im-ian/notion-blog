import { notFound } from "next/navigation";

import { PostStatus } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPosts } from "@/utils/notion";

export const dynamic = "force-dynamic";

const { use: useRssFeed } = getSiteConfig("rss");

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  if (!useRssFeed) {
    notFound();
  }

  const { title, lang } = getSiteConfig("site");
  const meta = getSiteConfig("meta");
  const description =
    typeof meta.description === "string" ? meta.description : "";

  if (process.env.NODE_ENV === "production" && !process.env.SITE_URL) {
    throw new Error(
      "SITE_URL environment variable is required for RSS feed generation in production",
    );
  }

  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  const posts = await getPosts();

  const items = posts.blocks
    .filter(
      (post) =>
        post.attributes.slug.value &&
        post.attributes.status.value === PostStatus.Public,
    )
    .map((post) => {
      const slug = post.attributes.slug.value || "";
      const postTitle = post.attributes.title?.value || slug;
      const summary = post.attributes.summary?.value || "";
      const dateValue = post.attributes.date?.value;
      const pubDate = new Date(dateValue || Date.now()).toUTCString();
      const link = `${baseUrl}/post/${slug}`;

      return `    <item>
      <title>${escapeXml(postTitle)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(summary)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(description)}</description>
    <language>${escapeXml(lang)}</language>
    <atom:link href="${escapeXml(`${baseUrl}/rss.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
