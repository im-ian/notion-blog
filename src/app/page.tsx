import { Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import { getPosts } from "@/utils/notion";

async function Home() {
  const { blocks } = await getPosts();

  return (
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
  );
}

export default Home;
