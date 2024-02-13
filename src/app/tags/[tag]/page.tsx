import { Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import { getPostsByTag } from "@/services/notion";

type PageProps = {
  params: {
    tag: string;
  };
};

async function TagPage({ params }: PageProps) {
  const { pages } = await getPostsByTag(params.tag);

  return (
    <Layout
      sprinkle={{
        paddingX: {
          mobile: "medium",
          tablet: "none",
        },
      }}
    >
      {pages.map((page) => {
        return <PostCard key={page.value.attributes.slug.value} page={page} />;
      })}
    </Layout>
  );
}

export default TagPage;
