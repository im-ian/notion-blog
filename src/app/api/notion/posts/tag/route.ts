import { NextRequest } from "next/server";

import { Posts } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPosts } from "@/utils/notion";

const { pageId } = getSiteConfig("notion");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  const posts = await getPosts(pageId);

  if (!tag) return new Response(null, { status: 404 });
  if (!posts) return new Response(null, { status: 404 });

  const filteredPosts = posts.blocks.filter((page) => {
    const tags = page.value.attributes.tags?.value?.split(",") || [];
    return tags.includes(tag);
  });

  if (!filteredPosts) return new Response(null, { status: 404 });

  return new Response(
    JSON.stringify({
      schema: posts.schema,
      blocks: filteredPosts,
    } satisfies Posts),
    {
      status: 200,
    },
  );
}
