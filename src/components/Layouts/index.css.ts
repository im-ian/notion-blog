import { style } from "@vanilla-extract/css";
import { sprinkles } from "../../css/sprinkles.css";

export const LayoutClassName = style([
  sprinkles({
    width: "720px",
    margin: "center",
  }),
]);

export const CardClassName = style([
  sprinkles({
    padding: "extraLarge",
    marginY: "medium",

    borderWidth: "thin",
    borderColor: "gray-100",
    borderStyle: "solid",
    borderRadius: "medium",

    // transition: "transform .3s ease",
    transitionProperty: "all",
    transitionDuration: "normal",
    transitionTimingFunction: "ease",
  }),
  {
    ":hover": {
      transform: "scale(1.01)",
    },
  },
]);
