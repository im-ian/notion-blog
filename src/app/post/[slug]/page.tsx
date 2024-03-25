import { Metadata } from "next";
import Link from "next/link";

import Comment from "@/components/Comment";
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
  const { blocks } = await getPosts();
  if (!blocks.length) return [];

  return blocks
    .map((block) => {
      return { slug: block.value.attributes.slug.value || "" };
    })
    .filter((block) => block.slug);
}

export async function generateMetadata({ params }: PageProps) {
  const { block } = await getPost(params.slug);
  const { attributes } = block.value;
  return {
    title: attributes.title.value,
  } as Metadata;
}

async function PostPage({ params }: PageProps) {
  const { block } = await getPost(params.slug);
  const { attributes } = block.value;

  if (!attributes) return null;

  const { title, tags, date } = attributes;
  const renderBlock = await getBlockById(block.value.id);

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
          {title && (
            <Heading size={{ mobile: "3x", tablet: "4x" }}>
              {title.value}
            </Heading>
          )}
          {date && (
            <Box sprinkle={{ marginY: "medium" }}>
              <Date date={date.value || ""} />
            </Box>
          )}
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
          </Box>
        </Box>
        {block && (
          <Box sprinkle={{ paddingTop: "large" }}>
            <NotionPage recordMap={renderBlock} />
          </Box>
        )}
        <Box sprinkle={{ paddingTop: "xlarge" }}>
          <Comment />
        </Box>
      </Layout>
    </>
  );
}

export default PostPage;
