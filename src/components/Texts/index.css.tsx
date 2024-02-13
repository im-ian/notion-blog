import { style } from "@vanilla-extract/css";

import { sprinkles } from "../../css/sprinkles.css";

export const headingClassName = style([
  {
    fontWeight: "600",
    letterSpacing: "-0.03em",
  },
]);

export const DateClassName = style([
  sprinkles({
    fontSize: "1x",
    color: "gray-400",
  }),
]);
