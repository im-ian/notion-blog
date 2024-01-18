import { Pages } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPages } from "@/utils/notion";

const { pageId } = getSiteConfig("notion");

export async function GET() {
  const pages = await getPages(pageId);

  if (!pages) return new Response(null, { status: 404 });

  return new Response(JSON.stringify(pages satisfies Pages), {
    status: 200,
  });
}
