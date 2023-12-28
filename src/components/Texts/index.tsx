import { HTMLAttributes, PropsWithChildren } from "react";
import { DateClassName, headingColorVariant } from "./index.css";
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

export function Date({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={classNames([DateClassName, className])} {...props} />;
}
