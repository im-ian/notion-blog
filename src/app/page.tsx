import { Flex, Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import ProfilePage from "@/components/Profile";
import { getPosts } from "@/utils/notion";

async function Home() {
  const { blocks } = await getPosts();

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
        {blocks.map((block) => {
          return (
            <PostCard key={block.value.attributes.slug.value} block={block} />
          );
        })}
      </Layout>
    </Flex>
  );
}

export default Home;
