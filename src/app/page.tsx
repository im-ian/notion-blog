import { Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import { sprinkles } from "@/css/sprinkles.css";
import { getPosts } from "@/services/notion";

async function Home() {
  const { pages } = await getPosts();

  return (
    <Layout
      className={sprinkles({
        padding: "medium",
      })}
    >
      {pages.map((page) => {
        return <PostCard key={page.value.attributes.slug.value} page={page} />;
      })}
    </Layout>
  );
}

export default Home;
