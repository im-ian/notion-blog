import ProfileWithPostList from "@/components/Pages/ProfileWIthPostList";
import { getPostsByTag } from "@/utils/notion";

type PageProps = {
  params: Promise<{
    tag: string;
  }>;
};

async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);

  return <ProfileWithPostList posts={posts} tag={decodedTag} />;
}

export default TagPage;
