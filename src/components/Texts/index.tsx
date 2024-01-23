"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { PropsWithChildren } from "react";

import {
  DateClassName,
  headingClassName,
  headingColorVariants,
  headingFontSizeVariants,
  textClassName,
  textFontSizeVariants,
} from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { themeTextColor } from "@/css/theme.css";
import { vars } from "@/css/vars.css";
import { classNames, toDateFormat } from "@/utils/string";

export function Heading({
  color = "brand-400",
  size = "4x",
  children,
}: PropsWithChildren<{
  color?: keyof typeof vars.color;
  size?: keyof typeof vars.fontSize;
}>) {
  return (
    <h1
      style={assignInlineVars({
        [headingColorVariants]: vars.color[color],
        [headingFontSizeVariants]: vars.fontSize[size],
      })}
      className={headingClassName}
    >
      {children}
    </h1>
  );
}

interface DateProps {
  date: string;
}

export function Date({ date }: DateProps) {
  return <span className={DateClassName}>{toDateFormat(date)}</span>;
}

interface TextProps {
  color?: keyof typeof vars.color;
  size?: keyof typeof vars.fontSize;
  children: React.ReactNode;
}

export function Text({ color, size = "1x", children }: TextProps) {
  const colorSprinkles = color ? sprinkles({ color }) : themeTextColor;

  return (
    <p
      style={assignInlineVars({
        [textFontSizeVariants]: vars.fontSize[size],
      })}
      className={classNames([textClassName, colorSprinkles])}
    >
      {children}
    </p>
  );
}
