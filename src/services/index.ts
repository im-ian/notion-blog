import { getSiteConfig } from "@/utils/config";

const { domain } = getSiteConfig("site");

export function request(path: string, init?: RequestInit) {
  const isDev = process.env.NODE_ENV === "development";
  const host = isDev ? domain.dev : domain.prod;
  const absPath = `${host}${path}`;

  return fetch(absPath, init);
}
