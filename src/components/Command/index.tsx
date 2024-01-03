"use client";
import { useParams } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Command, { filterItems, getItemIndex } from "react-cmdk";

import { useNotionContext } from "@/contexts/NotionContext";

import "react-cmdk/dist/cmdk.css";

export interface CommandPaletteHandle {
  open(): void;
  close(): void;
}

export default forwardRef<CommandPaletteHandle>(
  function CommandPalette(_, ref) {
    const params = useParams();

    const { data } = useNotionContext();
    const pages = data?.pages.map((page) => page.value) || [];

    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    useImperativeHandle(ref, () => ({
      close: () => setIsCommandOpen(false),
      open: () => setIsCommandOpen(true),
    }));

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.metaKey && e.key === "k") {
          e.preventDefault();
          e.stopPropagation();

          setIsCommandOpen((prev) => !prev);
        }
      }
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const filteredItems = filterItems(
      [
        {
          heading: "이동",
          id: "goto",
          items: [
            {
              id: "home",
              children: "홈",
              icon: "HomeIcon",
              href: "/",
            },
          ],
        },
        {
          heading: "다른 글",
          id: "articles",
          items: pages
            .filter(({ attributes }) => attributes.slug.value !== params?.slug)
            .map(({ attributes }) => ({
              id: attributes.slug.value || "",
              icon: "DocumentIcon",
              children: attributes.title.value,
              href: `/${attributes.slug.value}`,
            })),
        },
      ],
      searchKeyword,
    );

    return (
      <Command
        isOpen={isCommandOpen}
        onChangeOpen={setIsCommandOpen}
        search={searchKeyword}
        onChangeSearch={setSearchKeyword}
        page={"root"}
      >
        <Command.Page id={"root"}>
          {filteredItems.length ? (
            filteredItems.map((list) => (
              <Command.List key={list.id} heading={list.heading}>
                {list.items.map(({ id, ...rest }) => (
                  <Command.ListItem
                    key={id}
                    index={getItemIndex(filteredItems, id)}
                    {...rest}
                  />
                ))}
              </Command.List>
            ))
          ) : (
            <Command.FreeSearchAction />
          )}
        </Command.Page>
      </Command>
    );
  },
);
