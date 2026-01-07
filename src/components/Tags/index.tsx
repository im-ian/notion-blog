"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import Link from "next/link";
import { Tag as TagIcon } from "react-feather";

import { getFontColor } from "@/utils/color";
import { Box, Flex } from "../Layouts";
import {
  TagBgColorVariants,
  TagClassName,
  TagFontColorVariants,
} from "./index.css";

interface TagProps {
  label: string;
  bgColor?: string;
  clickable?: boolean;
}

export function Tag({ label, bgColor, clickable }: TagProps) {
  const color = bgColor ? getFontColor(bgColor) : "black";

  const props = {
    className: TagClassName,
    style: assignInlineVars({
      [TagFontColorVariants]: color,
      [TagBgColorVariants]: bgColor,
    }),
  };

  return clickable ? (
    <Link href={label} {...props}>
      <Flex>
        <TagIcon size={"0.8rem"} fill={color} />
        <Box sprinkle={{ marginLeft: "xsmall" }}>{label}</Box>
      </Flex>
    </Link>
  ) : (
    <span {...props}>
      <Flex>
        <TagIcon size={"0.8rem"} color={color} />
        <Box sprinkle={{ marginLeft: "xsmall" }}>{label}</Box>
      </Flex>
    </span>
  );
}
