import { HTMLAttributes, PropsWithChildren } from "react";
import {
  CardClassName,
  FlexClassName,
  LayoutClassName,
  alignItemsVariant,
  flexDirectionVariant,
} from "./index.css";
import { classNames } from "@/utils/string";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export function Layout({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames([LayoutClassName, className])} {...props}></div>
  );
}

interface FlexProps {
  flexDirection?: "row" | "column";
  alignItems?: "center" | "flex-start" | "flex-end";
}

export function Flex({
  flexDirection = "row",
  alignItems = "center",
  children,
}: PropsWithChildren<FlexProps>) {
  return (
    <div
      className={FlexClassName}
      style={assignInlineVars({
        [flexDirectionVariant]: flexDirection,
        [alignItemsVariant]: alignItems,
      })}
    >
      {children}
    </div>
  );
}

interface FlexItemProps {
  flex?: string | number;
}

export function FlexItem({
  flex = 1,
  children,
}: PropsWithChildren<FlexItemProps>) {
  return <div style={{ flex }}>{children}</div>;
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames([CardClassName, className])} {...props}></div>
  );
}
