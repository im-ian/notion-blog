import { HTMLAttributes, PropsWithChildren } from "react";
import { DateClassName, TagClassName, headingColorVariant } from "./index.css";
import { classNames } from "@/utils/string";
import { vars } from "@/css/vars.css";
import { sprinkles } from "@/css/sprinkles.css";

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

export function Date(props: HTMLAttributes<HTMLSpanElement>) {
  return <span className={DateClassName} {...props} />;
}

export function Tag(props: HTMLAttributes<HTMLSpanElement>) {
  return <span className={TagClassName} {...props} />;
}
