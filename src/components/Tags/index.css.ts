import { sprinkles } from "@/css/sprinkles.css";
import { style } from "@vanilla-extract/css";

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
