"use client";

import { createContext, type PropsWithChildren, useContext } from "react";

import type { Posts } from "@/types/notion";

interface PageContextProviderProps {
  posts: Posts | null;
}

interface PageContextProps {
  data: Posts | null;
}

const NotionContext = createContext<PageContextProps>({
  data: null,
});

export const useNotionContext = () => {
  const context = useContext(NotionContext);
  if (!context) {
    throw new Error("useNotionContext must be used within a NotionProvider");
  }
  return context;
};

export default function NotionProvider({
  children,
  posts,
}: PropsWithChildren<PageContextProviderProps>) {
  return (
    <NotionContext.Provider value={{ data: posts }}>
      {children}
    </NotionContext.Provider>
  );
}
