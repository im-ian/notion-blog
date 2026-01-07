"use client";

import type { PropsWithChildren } from "react";

import { sprinkles } from "@/css/sprinkles.css";
import type { vars } from "@/css/vars.css";
import type { DeviceWithStyle, ThemeWithStyle } from "@/types/style";
import { cx, toDateFormat } from "@/utils/string";
import { DateClassName, headingClassName } from "./index.css";

interface TextProps {
  color?: ThemeWithStyle<keyof typeof vars.color>;
  size?: DeviceWithStyle<keyof typeof vars.fontSize>;
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

interface FormattedDateProps {
  date: string;
}

export function FormattedDate({ date }: FormattedDateProps) {
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
