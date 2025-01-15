import ProfileWithPostList from "@/components/Pages/ProfileWIthPostList";
import { getPostsByTag } from "@/utils/notion";

type PageProps = {
  params: Promise<{
    tag: string;
  }>;
};

async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = await getPostsByTag(decodeURIComponent(tag));

  return <ProfileWithPostList posts={posts} />;
}

export default TagPage;
