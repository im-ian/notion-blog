import { Posts } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPosts } from "@/utils/notion";

const { pageId } = getSiteConfig("notion");

export async function GET() {
  const posts = await getPosts(pageId);

  if (!posts) return new Response(null, { status: 404 });

  return new Response(JSON.stringify(posts satisfies Posts), {
    status: 200,
  });
}
