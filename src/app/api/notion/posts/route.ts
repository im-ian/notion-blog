import { NextRequest } from "next/server";

import { getSiteConfig } from "@/utils/config";
import { getPages } from "@/utils/notion";

const { pageId } = getSiteConfig("notion");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const pages = await getPages(pageId);

  if (!pages) return new Response(null, { status: 404 });

  if (slug) {
    // if has slug, return single page
    const filteredPages = pages.pages.find(
      (page) => page.value.attributes.slug.value === slug,
    );

    if (!filteredPages) return new Response(null, { status: 404 });

    return new Response(
      JSON.stringify({ schema: pages.schema, page: filteredPages }),
      {
        status: 200,
      },
    );
  }

  return new Response(JSON.stringify(pages), {
    status: 200,
  });
}
