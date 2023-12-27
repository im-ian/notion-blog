import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../css/sprinkles.css";

export const HeadingClassName = style([
  sprinkles({
    fontSize: "4x",
  }),
]);

export const DateClassName = style([
  sprinkles({
    fontSize: "1x",
    color: "gray-400",
  }),
]);
