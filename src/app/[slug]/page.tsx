import { NotionAPI } from "notion-client";
import { NotionPage } from "@/components/NotionRenderer";

// import { getPageData } from "@/services/notion";
import { getSiteConfig } from "@/utils/config";
import { getSchema, getPageProperties, getPages } from "@/utils/notion";
import Head from "next/head";
import { Layout } from "@/components/Layouts";
import { Date, Heading } from "@/components/Texts";
import { getPageContent } from "@/services/notion";

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
  const { pageId } = getSiteConfig("notion");
  const pageData = await getPageContent(pageId);

  if (!pageData) {
    return {
      page: undefined,
      properties: undefined,
    };
  }

  const scheme = getSchema(pageData.collection);
  const pages = getPages(pageData.block);

  const filteredPage = pages.filter((p) => {
    const properties = getPageProperties(p.value.properties, scheme);
    return properties.slug.value === slug;
  });

  const resultPage = filteredPage?.[0];
  const properties = getPageProperties(resultPage.value.properties, scheme);

  return {
    page: resultPage ? await getPageContent(resultPage.value.id) : undefined,
    properties,
  };
}

async function ArticlePage({ params }: PageProps) {
  const { page, properties } = await getNotionPage(params.slug);

  const title = properties?.title.value;
  const date = properties?.date.value;

  return (
    <Layout>
      <Head>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content="@transitive_bs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {title && <Heading>{title}</Heading>}
        {title && <Date>{date}</Date>}
      </div>
      {page && <NotionPage recordMap={page} />}
    </Layout>
  );
}

export default ArticlePage;
