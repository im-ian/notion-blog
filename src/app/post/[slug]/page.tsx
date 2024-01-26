import { Metadata } from "next";
import Link from "next/link";

import { Box, Flex, Layout } from "@/components/Layouts";
import { NotionPage } from "@/components/NotionRenderer";
import ScrollProgressBar from "@/components/Pages/ScrollProgressBar";
import { Tag } from "@/components/Tags";
import { Date, Heading } from "@/components/Texts";
import { Routes } from "@/constants";
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

  const { title, tags, date } = attributes;
  const renderBlock = await getBlockById(page.value.id);

  const tagList = tags.value?.split(",") || [];

  return (
    <>
      <ScrollProgressBar />
      <Layout
        sprinkle={{
          paddingTop: {
            mobile: "small",
            tablet: "large",
          },
          paddingBottom: "xxlarge",
        }}
      >
        <Box
          sprinkle={{
            paddingTop: "large",
            paddingX: "large",
          }}
        >
          {title && <Heading>{title.value}</Heading>}
          <Box sprinkle={{ marginY: "medium" }}>
            <Flex>
              {tagList.map((tag) => (
                <Link key={tag} href={Routes.Tag(tag)}>
                  <Tag
                    bgColor={getOptionColor({
                      options: tags.options,
                      value: tag,
                    })}
                    label={tag}
                  />
                </Link>
              ))}
            </Flex>
            {date && (
              <Box sprinkle={{ marginY: "medium" }}>
                <Date date={date.value || ""} />
              </Box>
            )}
          </Box>
        </Box>
        {page && (
          <Box sprinkle={{ paddingTop: "large" }}>
            <NotionPage recordMap={renderBlock} />
          </Box>
        )}
      </Layout>
    </>
  );
}

export default PostPage;
