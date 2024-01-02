import Head from "next/head";

import { NotionPage } from "@/components/NotionRenderer";
import { Flex, Layout } from "@/components/Layouts";
import { Date, Heading } from "@/components/Texts";
import { Tags } from "@/components/Tags";

import { sprinkles } from "@/css/sprinkles.css";
import { getSchema, getPageProperties, getPages } from "@/utils/notion";

import { getPageContent } from "@/services/notion";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const pageData = await getPageContent();
  if (!pageData) return [];

  const scheme = getSchema(pageData.collection);
  const pages = getPages(pageData.block);

  return pages.map((page) => {
    const properties = getPageProperties(page.value.properties, scheme);
    return { slug: properties?.slug.value };
  });
}

async function getNotionPage(slug: string) {
  const pageData = await getPageContent();

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
  const properties = getPageProperties(resultPage?.value.properties, scheme);

  return {
    page: resultPage ? await getPageContent(resultPage.value.id) : undefined,
    properties,
  };
}

async function ArticlePage({ params }: PageProps) {
  const { page, properties } = await getNotionPage(params.slug);

  const title = properties?.title.value;
  const category = properties?.category.value;
  const tags = properties?.tags.value;
  const date = properties?.date.value;

  return (
    <Layout
      className={sprinkles({
        paddingTop: "large",
        paddingX: "large",
      })}
    >
      <Head>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:creator" content="@transitive_bs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={sprinkles({
          paddingTop: "large",
          paddingX: "large",
        })}
      >
        {title && <Heading tint>{title}</Heading>}
        <Flex>
          {category && <Tags tags={category} />}
          {tags && <Tags tags={tags} />}
        </Flex>
        {date && <Date date={date} />}
      </div>
      {page && <NotionPage recordMap={page} />}
    </Layout>
  );
}

export default ArticlePage;
