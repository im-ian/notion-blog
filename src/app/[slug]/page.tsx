import { NotionAPI } from "notion-client";
import { NotionPage } from "@/components/NotionRenderer";

// import { getPageData } from "@/services/notion";
import { getSiteConfig } from "@/utils/config";
import { getSchema, getPageProperties, getPages } from "@/utils/notion";

type PageProps = {
  params: {
    slug: string;
  };
};

// export async function generateStaticParams() {
//   return {
//     paths: [],
//     fallback: false,
//   };
// }

export async function getNotionPage(slug: string) {
  const api = new NotionAPI();

  const { pageId } = getSiteConfig("notion");
  const page = await api.getPage(pageId);

  if (!page) {
    return {
      page: undefined,
    };
  }

  const scheme = getSchema(page.collection);
  const pages = getPages(page.block);

  const filteredPage = pages.filter((p) => {
    const properties = getPageProperties(p.value.properties, scheme);
    return properties.slug.value === slug;
  });

  const resultPage = filteredPage[0] || undefined;

  return {
    page: resultPage ? await api.getPage(resultPage.value.id) : undefined,
  };
}

export default async function BlogArticlePage(props: PageProps) {
  const { page } = await getNotionPage(props.params.slug);

  return (
    <div>
      <h1>Blog Article Page</h1>
      {page && <NotionPage recordMap={page} />}
    </div>
  );
}
