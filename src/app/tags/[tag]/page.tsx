import ProfileWithPostList from "@/components/Pages/ProfileWIthPostList";
import { getPostsByTag } from "@/utils/notion";

type PageProps = {
  params: {
    tag: string;
  };
};

async function TagPage({ params }: PageProps) {
  const posts = await getPostsByTag(decodeURIComponent(params.tag));

  return <ProfileWithPostList posts={posts} />;
}

export default TagPage;
