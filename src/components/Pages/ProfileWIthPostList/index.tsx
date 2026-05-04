import { Box, Flex, Layout } from "@/components/Layouts";
import { Pagination } from "@/components/Pagination";
import { PostCard } from "@/components/Posts";
import { InfinitePostList } from "@/components/Posts/InfinitePostList";
import { ResponsiveProfile } from "@/components/Profile";
import { Heading } from "@/components/Texts";
import type { Posts } from "@/types/notion";
import type { PaginationInfo } from "@/utils/notion";

interface ProfileWithPostListProps {
  posts: Posts;
  tag?: string;
  pagination: PaginationInfo;
}

function ProfileWithPostList({
  posts,
  tag,
  pagination,
}: ProfileWithPostListProps) {
  const heading = tag
    ? `${tag}/Posts(${pagination.totalCount})`
    : `Posts(${pagination.totalCount})`;

  const cards = posts.blocks.map((block) => (
    <PostCard key={block.attributes.slug.value} block={block} />
  ));

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
        {pagination.mode === "infinite" ? (
          <InfinitePostList items={cards} pageSize={pagination.pageSize} />
        ) : (
          <>
            {cards}
            <Pagination
              basePath={pagination.basePath}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          </>
        )}
      </Layout>
    </Flex>
  );
}

export default ProfileWithPostList;
