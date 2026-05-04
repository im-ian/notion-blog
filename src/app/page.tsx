import ProfileWithPostList from "@/components/Pages/ProfileWIthPostList";
import { getPosts, paginatePosts } from "@/utils/notion";

interface HomeProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const allPosts = await getPosts();
  const { posts, pagination } = paginatePosts(allPosts, page, "/");

  return <ProfileWithPostList posts={posts} pagination={pagination} />;
}

export default Home;
