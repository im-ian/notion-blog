"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import Link from "next/link";
import { SelectOption } from "notion-types";

import {
  TagBgColorVariants,
  TagClassName,
  TagFontColorVariants,
} from "./index.css";

import { getFontColor, getOptionColor } from "@/utils/color";

export function Tags({
  options,
  tags,
  clickable,
}: {
  options?: SelectOption[];
  tags: string;
  clickable?: boolean;
}) {
  const tagList = tags.split(",");

  return tagList?.map((tag) => (
    <Tag
      key={tag}
      label={tag}
      bgColor={getOptionColor({
        options,
        value: tag,
      })}
      clickable={clickable}
    />
  ));
}

interface TagProps {
  label: string;
  bgColor?: string;
  clickable?: boolean;
}

export function Tag({ label, bgColor, clickable }: TagProps) {
  const props = {
    className: TagClassName,
    style: assignInlineVars({
      [TagFontColorVariants]: bgColor ? getFontColor(bgColor) : "black",
      [TagBgColorVariants]: bgColor,
    }),
  };

  return clickable ? (
    <Link href={label} {...props}>
      {label}
    </Link>
  ) : (
    <span {...props}>{label}</span>
  );
}
