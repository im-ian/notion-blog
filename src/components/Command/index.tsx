"use client";
import { useParams } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Command, { filterItems, getItemIndex } from "react-cmdk";
import { FileText, Home, Tag } from "react-feather";

import { Routes } from "@/constants";
import { useNotionContext } from "@/contexts/Posts";
import { vars } from "@/css/vars.css";
import { getSiteConfig } from "@/utils/config";

import "react-cmdk/dist/cmdk.css";

const iconStyle = {
  size: 20,
  color: vars.color["gray-400"],
};

const DocumentIcon = <FileText {...iconStyle} />;

export interface CommandPaletteHandle {
  open(): void;
  close(): void;
}

export default forwardRef<CommandPaletteHandle>(
  function CommandPalette(_, ref) {
    const params = useParams();

    const { data } = useNotionContext();
    const posts = data?.blocks.map((page) => page.value) || [];

    const [isCommandOpen, setIsCommandOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");

    useImperativeHandle(ref, () => ({
      close: () => setIsCommandOpen(false),
      open: () => setIsCommandOpen(true),
    }));

    useEffect(() => {
      const { useSearchShortcut } = getSiteConfig("site");
      if (!useSearchShortcut) return;

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
          heading: "바로가기",
          id: "goto",
          items: [
            {
              id: "home",
              children: "홈",
              icon: () => <Home {...iconStyle} />,
              href: Routes.Home(),
            },
            {
              id: "tags",
              children: "태그",
              icon: () => <Tag {...iconStyle} />,
              href: Routes.Tag(),
            },
          ],
        },
        {
          heading: `다른 포스트 (${posts.length - 1})`,
          id: "posts",
          items: posts
            .filter(({ attributes }) => attributes.slug.value !== params?.slug)
            .map(({ attributes }) => ({
              id: attributes.slug.value || "",
              icon: () => DocumentIcon,
              children: attributes.title.value,
              showType: false,
              href: Routes.Post(attributes.slug.value || ""),
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
