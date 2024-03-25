import { NextRequest } from "next/server";

import { Post } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPosts } from "@/utils/notion";

const { blogPageId } = getSiteConfig("notion");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const posts = await getPosts(blogPageId);

  if (!posts) return new Response(null, { status: 404 });

  // if has slug, return single post
  const filteredPosts = posts.blocks.find(
    (block) => block.value.attributes.slug.value === slug,
  );

  if (!filteredPosts) return new Response(null, { status: 404 });

  return new Response(
    JSON.stringify({
      schema: posts.schema,
      block: filteredPosts,
    } satisfies Post),
    {
      status: 200,
    },
  );
}
