"use client";

import { PropsWithChildren, createContext, useContext } from "react";

import { Pages } from "@/types/notion";

interface PageContextProviderProps {
  pages: Pages | null;
}

interface PageContextProps {
  data: Pages | null;
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
  pages,
}: PropsWithChildren<PageContextProviderProps>) {
  return (
    <NotionContext.Provider value={{ data: pages }}>
      {children}
    </NotionContext.Provider>
  );
}
