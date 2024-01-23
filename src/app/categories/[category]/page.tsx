import { Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import { sprinkles } from "@/css/sprinkles.css";
import { getPostsByCategory } from "@/services/notion";

type PageProps = {
  params: {
    category: string;
  };
};

async function CategoryPage({ params }: PageProps) {
  const { pages } = await getPostsByCategory(params.category);

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

export default CategoryPage;
