import { style, styleVariants } from "@vanilla-extract/css";
import { sprinkles } from "../../css/sprinkles.css";
import { vars } from "@/css/vars.css";

export const headingColorVariant = styleVariants({
  tint: {
    color: vars.color["brand-400"],
  },
  default: {
    color: vars.color.black,
  },
});

export const DateClassName = style([
  sprinkles({
    fontSize: "1x",
    color: "gray-400",
  }),
]);

export const TagClassName = style([
  sprinkles({
    display: "inline-block",

    fontSize: "0x",
    color: "gray-400",

    marginX: "small",
    paddingX: "medium",
    paddingY: "small",
    borderRadius: "medium",

    background: "gray-100",
  }),
  {
    ":first-child": {
      marginLeft: "unset",
    },
  },
]);
