import { NextRequest } from "next/server";

import { Pages } from "@/types/notion";
import { getSiteConfig } from "@/utils/config";
import { getPages } from "@/utils/notion";

const { pageId } = getSiteConfig("notion");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const pages = await getPages(pageId);

  if (!pages) return new Response(null, { status: 404 });

  // if has slug, return single page
  const filteredPages = pages.pages.filter(
    (page) => page.value.attributes.category.value === category,
  );

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
