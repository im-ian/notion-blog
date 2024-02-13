"use client";

import { PropsWithChildren } from "react";

import { DateClassName, headingClassName } from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { vars } from "@/css/vars.css";
import { cx, toDateFormat } from "@/utils/string";

interface TextProps {
  color?:
    | keyof typeof vars.color
    | {
        darkMode: keyof typeof vars.color;
        lightMode: keyof typeof vars.color;
      };
  size?:
    | keyof typeof vars.fontSize
    | {
        mobile: keyof typeof vars.fontSize;
        tablet: keyof typeof vars.fontSize;
      };
}

export function Heading({
  color = "brand-400",
  size = "4x",
  children,
}: PropsWithChildren<TextProps>) {
  const headingFontSize =
    typeof size === "string"
      ? sprinkles({
          fontSize: size,
        })
      : sprinkles({
          fontSize: {
            mobile: size.mobile,
            tablet: size.tablet,
          },
        });

  const headingColor = sprinkles({ color });

  return (
    <h1 className={cx([headingClassName, headingFontSize, headingColor])}>
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

export function Text({
  color = {
    darkMode: "white",
    lightMode: "black",
  },
  size = "1x",
  children,
}: PropsWithChildren<TextProps>) {
  const textSize = sprinkles({ fontSize: size });
  const textColor = sprinkles({ color });

  return <p className={cx([textSize, textColor])}>{children}</p>;
}
