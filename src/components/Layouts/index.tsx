import { HTMLAttributes } from "react";
import { CardClassName, LayoutClassName } from "./index.css";

export function Layout(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={LayoutClassName} {...props}></div>;
}

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={CardClassName} {...props}></div>;
}
