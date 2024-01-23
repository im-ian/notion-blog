import { createVar, style } from "@vanilla-extract/css";

import { sprinkles } from "../../css/sprinkles.css";

import { vars } from "@/css/vars.css";

export const headingFontSizeVariants = createVar();
export const headingColorVariants = createVar();

export const headingClassName = style([
  {
    vars: {
      [headingColorVariants]: vars.color["brand-400"],
      [headingFontSizeVariants]: vars.fontSize["4x"],
    },
    fontSize: headingFontSizeVariants,
    color: headingColorVariants,
  },
]);

export const DateClassName = style([
  sprinkles({
    fontSize: "1x",
    color: "gray-400",
  }),
]);

export const textFontSizeVariants = createVar();

export const textClassName = style([
  {
    vars: {
      [textFontSizeVariants]: vars.fontSize["1x"],
    },
    fontSize: textFontSizeVariants,
  },
]);
