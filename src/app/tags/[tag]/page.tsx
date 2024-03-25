import { Layout } from "@/components/Layouts";
import { PostCard } from "@/components/Posts";
import { getPostsByTag } from "@/services/notion";

type PageProps = {
  params: {
    tag: string;
  };
};

async function TagPage({ params }: PageProps) {
  const { blocks } = await getPostsByTag(params.tag);

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

export default TagPage;
