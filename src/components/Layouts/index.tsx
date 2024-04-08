"use client";

import { assignInlineVars } from "@vanilla-extract/dynamic";
import { HTMLAttributes, PropsWithChildren } from "react";

import { PostCardClassName } from "../Posts/index.css";

import {
  FlexClassName,
  LayoutClassName,
  flexItemClassName,
  flexVariant,
} from "./index.css";

import { sprinkles } from "@/css/sprinkles.css";
import { DeviceWithStyle } from "@/types/style";
import { cx } from "@/utils/string";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sprinkle?: Parameters<typeof sprinkles>[0];
}

export function Box({ className, sprinkle, ...props }: BoxProps) {
  const sprinklesStyle = sprinkle ? sprinkles(sprinkle) : undefined;

  return <div className={cx([className, sprinklesStyle])} {...props} />;
}

export function Layout({ className, sprinkle, children }: BoxProps) {
  return (
    <Box className={cx([LayoutClassName, className])} sprinkle={sprinkle}>
      {children}
    </Box>
  );
}

interface FlexProps {
  flexDirection?: DeviceWithStyle<"row" | "column">;
  alignItems?: DeviceWithStyle<"center" | "flex-start" | "flex-end">;
}

export function Flex({
  flexDirection = "row",
  alignItems = "center",
  children,
}: PropsWithChildren<FlexProps>) {
  const flexStyle = sprinkles({
    flexDirection,
    alignItems,
  });

  return <Box className={cx([FlexClassName, flexStyle])}>{children}</Box>;
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

export function Card({ className, children }: HTMLAttributes<HTMLDivElement>) {
  return <Box className={cx([PostCardClassName, className])}>{children}</Box>;
}
