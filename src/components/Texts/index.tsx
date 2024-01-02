import { PropsWithChildren } from "react";

import { DateClassName, headingColorVariant } from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { vars } from "@/css/vars.css";
import { classNames, toDateFormat } from "@/utils/string";

export function Heading({
  tint = false,
  size = "4x",
  children,
}: PropsWithChildren<{
  tint?: boolean;
  size?: keyof typeof vars.fontSize;
}>) {
  return (
    <h1
      className={classNames([
        headingColorVariant[tint ? "tint" : "default"],
        sprinkles({
          fontSize: size,
        }),
      ])}
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
