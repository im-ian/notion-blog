import { Flex, Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import ProfilePage from "@/components/Profile";
import { Posts } from "@/types/notion";

function ProfileWithPostList({ posts }: { posts: Posts }) {
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
      <ProfilePage />
      <Layout
        sprinkle={{
          paddingX: {
            mobile: "medium",
            tablet: "none",
          },
        }}
      >
        {posts.blocks.map((block) => {
          return (
            <PostCard key={block.value.attributes.slug.value} block={block} />
          );
        })}
      </Layout>
    </Flex>
  );
}

export default ProfileWithPostList;
