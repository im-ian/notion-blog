import ProfileWithPostList from "@/components/Pages/ProfileWIthPostList";
import { getPostsByTag, paginatePosts } from "@/utils/notion";

type PageProps = {
  params: Promise<{
    tag: string;
  }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

async function TagPage({ params, searchParams }: PageProps) {
  const { tag } = await params;
  const { page } = await searchParams;
  const decodedTag = decodeURIComponent(tag);
  const allPosts = await getPostsByTag(decodedTag);
  const basePath = `/tags/${encodeURIComponent(decodedTag)}`;
  const { posts, pagination } = paginatePosts(allPosts, page, basePath);

  return (
    <ProfileWithPostList
      posts={posts}
      tag={decodedTag}
      pagination={pagination}
    />
  );
}

export default TagPage;
