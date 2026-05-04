import { Box, Flex, Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import { ResponsiveProfile } from "@/components/Profile";
import { Heading } from "@/components/Texts";
import type { Posts } from "@/types/notion";

function ProfileWithPostList({ posts, tag }: { posts: Posts; tag?: string }) {
  const heading = tag
    ? `${tag}/Posts(${posts.blocks.length})`
    : `Posts(${posts.blocks.length})`;

  return (
    <Flex
      flexDirection={{
        mobile: "column",
        tablet: "column",
        desktop: "row",
      }}
      alignItems={{
        mobile: "center",
        tablet: "center",
        desktop: "flex-start",
      }}
    >
      <ResponsiveProfile />
      <Layout
        sprinkle={{
          paddingX: {
            mobile: "medium",
            tablet: "none",
          },
          paddingTop: {
            mobile: "xlarge",
            tablet: "large",
          },
        }}
      >
        <Box sprinkle={{ paddingX: "medium" }}>
          <Heading size={"3x"}>{heading}</Heading>
        </Box>
        {posts.blocks.map((block) => {
          return <PostCard key={block.attributes.slug.value} block={block} />;
        })}
      </Layout>
    </Flex>
  );
}

export default ProfileWithPostList;
