import { createVar, style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";
import { vars } from "@/css/vars.css";

export const TagFontColorVariants = createVar();
export const TagBgColorVariants = createVar();

export const TagClassName = style([
  sprinkles({
    display: "inline-block",

    fontSize: "0x",
    color: "gray-400",

    paddingX: "medium",
    paddingY: "small",
    marginRight: "small",
    borderRadius: "medium",

    background: "gray-100",
  }),
  {
    vars: {
      [TagFontColorVariants]: vars.color["gray-400"],
      [TagBgColorVariants]: vars.color["gray-200"],
    },
    color: TagFontColorVariants,
    backgroundColor: TagBgColorVariants,

    ":last-child": {
      marginRight: "unset",
    },
  },
]);
