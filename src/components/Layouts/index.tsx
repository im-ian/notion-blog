"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { HTMLAttributes, PropsWithChildren } from "react";

import {
  CardClassName,
  FlexClassName,
  LayoutClassName,
  alignItemsVariant,
  flexDirectionVariant,
  flexItemClassName,
  flexVariant,
} from "./index.css";

import { classNames } from "@/utils/string";

export function Box({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}

export function Layout({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Box className={classNames([LayoutClassName, className])} {...props} />
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
    <Box
      className={FlexClassName}
      style={assignInlineVars({
        [flexDirectionVariant]: flexDirection,
        [alignItemsVariant]: alignItems,
      })}
    >
      {children}
    </Box>
  );
}

interface FlexItemProps {
  flex?: string;
}

export function FlexItem({
  flex = "1",
  children,
}: PropsWithChildren<FlexItemProps>) {
  return (
    <Box
      className={flexItemClassName}
      style={assignInlineVars({
        [flexVariant]: flex,
      })}
    >
      {children}
    </Box>
  );
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <Box className={classNames([CardClassName, className])} {...props} />;
}
