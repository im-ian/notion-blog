import { HTMLAttributes } from "react";
import { CardClassName, LayoutClassName } from "./index.css";
import { classNames } from "@/utils/string";

export function Layout({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames([LayoutClassName, className])} {...props}></div>
  );
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames([CardClassName, className])} {...props}></div>
  );
}
