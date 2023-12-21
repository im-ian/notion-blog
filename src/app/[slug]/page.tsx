import type { NextPage } from "next";

import { getPage } from "@/services/notion";
import { getSiteConfig } from "@/utils/config";
import { getCollectionView } from "@/utils/notion";

type PageProps = NextPage<{
  slug: string;
}>;

export async function getNotionPage() {
  const { pageId } = getSiteConfig("notion");
  const page = await getPage(pageId);

  console.log(
    page?.collection["5ca116cb-03ca-4190-87d6-847336e07be1"].value.schema
  );

  // if (page?.block) {
  //   console.log(getCollectionView(page));
  // }

  return {
    props: {
      page,
    },
  };
}

export default async function BlogArticlePage(props: PageProps) {
  const page = await getNotionPage();

  return (
    <div>
      <h1>Blog Article Page</h1>
    </div>
  );
}
