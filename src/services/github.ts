import type { GithubProfile } from "@/types/github";
import { getSiteConfig } from "@/utils/config";

const { github } = getSiteConfig("profile");

export async function getUserGithub() {
  const [profile, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${github}`).then((res) =>
      res.json()
    ) as Promise<GithubProfile>,
    fetch(`https://api.github.com/users/${github}/repos`).then((res) =>
      res.json()
    ) as Promise<GithubProfile[]>,
  ]);

  return {
    profile,
    repos,
  };
}
