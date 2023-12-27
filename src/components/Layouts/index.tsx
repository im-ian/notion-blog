import { HTMLAttributes } from "react";
import { className } from "./index.css";

export function Layout(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}></div>;
}
