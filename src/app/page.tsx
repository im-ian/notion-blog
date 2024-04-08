import ProfileWithPostList from "@/components/Pages/ProfileWIthPostList";
import { getPosts } from "@/utils/notion";

async function Home() {
  const posts = await getPosts();

  return <ProfileWithPostList posts={posts} />;
}

export default Home;
