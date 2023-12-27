import { NotionAPI } from "notion-client";
import { NotionPage } from "@/components/NotionRenderer";

// import { getPageData } from "@/services/notion";
import { getSiteConfig } from "@/utils/config";
import { getSchema, getPageProperties, getPages } from "@/utils/notion";
import Head from "next/head";

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
      properties: undefined,
    };
  }

  const scheme = getSchema(page.collection);
  const pages = getPages(page.block);

  const filteredPage = pages.filter((p) => {
    const properties = getPageProperties(p.value.properties, scheme);
    return properties.slug.value === slug;
  });

  const resultPage = filteredPage[0] || undefined;
  const properties = getPageProperties(resultPage.value.properties, scheme);

  return {
    page: resultPage ? await api.getPage(resultPage.value.id) : undefined,
    properties,
  };
}

export default async function BlogArticlePage(props: PageProps) {
  const { page, properties } = await getNotionPage(props.params.slug);

  const title = properties?.title.value;

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content="@transitive_bs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {title && <h1>{title}</h1>}
      {page && <NotionPage recordMap={page} />}
    </>
  );
}
