"use client";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { SelectOption } from "notion-types";

import {
  TagBgColorVariants,
  TagClassName,
  TagFontColorVariants,
} from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { getFontColor, getOptionColor } from "@/utils/color";

export function Tags({
  options,
  tags,
}: {
  options?: SelectOption[];
  tags: string;
}) {
  const tagList = tags.split(",");

  return (
    <div
      className={sprinkles({
        paddingY: "medium",
      })}
    >
      {tagList?.map((tag) => (
        <Tag
          key={tag}
          label={tag}
          bgColor={getOptionColor({
            options,
            value: tag,
          })}
        />
      ))}
    </div>
  );
}

interface TagProps {
  label: string;
  bgColor?: string;
}

export function Tag({ label, bgColor }: TagProps) {
  return (
    <span
      className={TagClassName}
      style={assignInlineVars({
        [TagFontColorVariants]: bgColor ? getFontColor(bgColor) : "black",
        [TagBgColorVariants]: bgColor,
      })}
    >
      {label}
    </span>
  );
}
