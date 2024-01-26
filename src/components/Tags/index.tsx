"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import Link from "next/link";

import {
  TagBgColorVariants,
  TagClassName,
  TagFontColorVariants,
} from "./index.css";

import { getFontColor } from "@/utils/color";

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
