import { Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import { getPosts } from "@/services/notion";

async function Home() {
  const { pages } = await getPosts();

  return (
    <Layout sprinkle={{ padding: "medium" }}>
      {pages.map((page) => {
        return <PostCard key={page.value.attributes.slug.value} page={page} />;
      })}
    </Layout>
  );
}

export default Home;
