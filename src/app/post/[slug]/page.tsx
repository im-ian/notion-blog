import type { Metadata } from "next";
import Link from "next/link";

import Comment from "@/components/Comment";
import { Box, Flex, Layout } from "@/components/Layouts";
import { NotionPage } from "@/components/NotionRenderer";
import ScrollProgressBar from "@/components/Pages/ScrollProgressBar";
import { HorizontalProfile } from "@/components/Profile";
import { Tag } from "@/components/Tags";
import { FormattedDate, Heading } from "@/components/Texts";
import { Routes } from "@/constants";
import { getOptionColor } from "@/utils/color";
import { getBlockByPageId, getPost, getPosts } from "@/utils/notion";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const { blocks: posts } = await getPosts();
  if (!posts?.length) return [];

  return posts.map((block) => {
    return { slug: block.value.attributes.slug.value || "" };
  });
}

export const revalidate = 600; // 10 minutes

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { block } = await getPost(slug);
  const { attributes } = block.value;

  const title = attributes.title.value;
  const description = attributes.summary.value;
  const image = attributes.thumbnail.value;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: [
          {
            url: image,
          },
        ],
      }),
    },
  } as Metadata;
}

async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { block } = await getPost(slug);
  const { attributes } = block.value;

  if (!attributes) return null;

  const { title, tags, date } = attributes;
  const renderBlock = await getBlockByPageId(block.value.id);

  const tagList = tags.value?.split(",") || [];

  return (
    <>
      <ScrollProgressBar />
      <Layout
        sprinkle={{
          width: {
            desktop: "720px",
          },
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
              <FormattedDate date={date.value || ""} />
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
          <Box sprinkle={{ paddingTop: "xlarge" }}>
            <NotionPage recordMap={renderBlock} />
          </Box>
        )}
        <Box sprinkle={{ marginTop: "xlarge" }}>
          <HorizontalProfile />
        </Box>
        <Box sprinkle={{ marginTop: "large" }}>
          <Comment />
        </Box>
      </Layout>
    </>
  );
}

export default PostPage;
