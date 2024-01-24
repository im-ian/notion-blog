import { Metadata } from "next";
import Link from "next/link";

import { Flex, Layout } from "@/components/Layouts";
import { NotionPage } from "@/components/NotionRenderer";
import { Tag, Tags } from "@/components/Tags";
import { Date, Heading } from "@/components/Texts";
import { Routes } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { getPost, getPosts } from "@/services/notion";
import { getOptionColor } from "@/utils/color";
import { getBlockById } from "@/utils/notion";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const { pages } = await getPosts();
  if (!pages.length) return [];

  return pages
    .map((page) => {
      return { slug: page.value.attributes.slug.value || "" };
    })
    .filter((page) => page.slug);
}

export async function generateMetadata({ params }: PageProps) {
  const { page } = await getPost(params.slug);
  const { attributes } = page.value;
  return {
    title: attributes.title.value,
  } as Metadata;
}

async function PostPage({ params }: PageProps) {
  const { page } = await getPost(params.slug);
  const { attributes } = page.value;

  if (!attributes) return null;

  const { title, category, tags, date } = attributes;
  const renderBlock = await getBlockById(page.value.id);

  return (
    <Layout
      className={sprinkles({
        paddingTop: {
          mobile: "small",
          tablet: "large",
        },
        paddingBottom: "xxlarge",
      })}
    >
      <div
        className={sprinkles({
          paddingTop: "large",
          paddingX: "large",
        })}
      >
        {title && <Heading>{title.value}</Heading>}
        <Flex>
          {category && (
            <Link href={Routes.Category(category.value)}>
              <Tag
                bgColor={getOptionColor({
                  options: category.options,
                  value: category.value,
                })}
                label={category.value || ""}
              />
            </Link>
          )}
          {tags && (
            <div
              className={sprinkles({
                marginLeft: "small",
              })}
            >
              <Tags tags={tags.value || ""} />
            </div>
          )}
        </Flex>
        {date && <Date date={date.value || ""} />}
      </div>
      {page && (
        <div
          className={sprinkles({
            paddingTop: "large",
          })}
        >
          <NotionPage recordMap={renderBlock} />
        </div>
      )}
    </Layout>
  );
}

export default PostPage;
