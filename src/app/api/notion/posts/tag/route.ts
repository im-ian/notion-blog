import { NextRequest } from "next/server";

import { Pages } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPages } from "@/utils/notion";

const { pageId } = getSiteConfig("notion");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  const pages = await getPages(pageId);

  if (!tag) return new Response(null, { status: 404 });
  if (!pages) return new Response(null, { status: 404 });

  const filteredPages = pages.pages.filter((page) => {
    const tags = page.value.attributes.tags?.value?.split(",") || [];
    return tags.includes(tag);
  });

  if (!filteredPages) return new Response(null, { status: 404 });

  return new Response(
    JSON.stringify({
      schema: pages.schema,
      pages: filteredPages,
    } satisfies Pages),
    {
      status: 200,
    },
  );
}
