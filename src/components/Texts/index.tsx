import { HTMLAttributes } from "react";
import { DateClassName, HeadingClassName } from "./index.css";

export function Heading(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={HeadingClassName} {...props} />;
}

export function Date(props: HTMLAttributes<HTMLSpanElement>) {
  return <span className={DateClassName} {...props} />;
}
