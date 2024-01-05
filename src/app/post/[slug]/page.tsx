import { Metadata } from "next";

import { Flex, Layout } from "@/components/Layouts";
import { NotionPage } from "@/components/NotionRenderer";
import { Tags } from "@/components/Tags";
import { Date, Heading } from "@/components/Texts";
import { Routes } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { getPageContent } from "@/services/notion";
import { getSchema, getPageAttribute, getPageList } from "@/utils/notion";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const pageData = await getPageContent();
  if (!pageData) return [];

  const scheme = getSchema(pageData.collection);
  const pages = getPageList(pageData.block);

  return pages.map((page) => {
    const properties = getPageAttribute(page.value.properties, scheme);
    return { slug: Routes.Post(properties.slug.value || "") };
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
  const pages = getPageList(pageData.block);

  const filteredPage = pages.filter((p) => {
    const properties = getPageAttribute(p.value.properties, scheme);
    return properties.slug.value === slug;
  });

  const resultPage = filteredPage?.[0];
  const properties = getPageAttribute(resultPage?.value.properties, scheme);

  return {
    page: resultPage ? await getPageContent(resultPage.value.id) : undefined,
    properties,
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { properties } = await getNotionPage(params.slug);

  if (!properties) return null;

  return {
    title: properties.title.value,
  } as Metadata;
}

async function PostPage({ params }: PageProps) {
  const { page, properties } = await getNotionPage(params.slug);

  if (!properties) return null;

  const { title, category, tags, date } = properties;

  return (
    <Layout
      className={sprinkles({
        paddingTop: "large",
        paddingX: "large",
      })}
    >
      <div
        className={sprinkles({
          paddingTop: "large",
          paddingX: "large",
        })}
      >
        {title && <Heading tint>{title.value}</Heading>}
        <Flex>
          {category && (
            <Tags options={category.options} tags={category.value || ""} />
          )}
          {tags && <Tags options={tags.options} tags={tags.value || ""} />}
        </Flex>
        {date && <Date date={date.value || ""} />}
      </div>
      {page && <NotionPage recordMap={page} />}
    </Layout>
  );
}

export default PostPage;
