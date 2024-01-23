import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";
import { themeBackground } from "@/css/theme.css";

export const HeaderContainerClassName = style([
  sprinkles({
    position: "sticky",

    width: "100vw",
    paddingY: "large",
    paddingX: {
      mobile: "large",
      tablet: "none",
    },
    marginBottom: "large",

    borderColor: {
      lightMode: "gray-100",
      darkMode: "gray-600",
    },
    borderTopWidth: "none",
    borderRightWidth: "none",
    borderBottomWidth: "thin",
    borderLeftWidth: "none",
    borderStyle: "solid",
  }),
  {
    top: 0,
    zIndex: 1,
  },
  themeBackground,
]);

export const HeaderIconClassName = style([
  sprinkles({
    display: "inline-block",
    marginX: "medium",
    color: {
      lightMode: "black",
      darkMode: "white",
    },

    transitionProperty: "all",
    transitionDuration: "normal",
    transitionTimingFunction: "ease-in-out",
  }),
  {
    height: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
    ":last-child": {
      marginRight: 0,
    },
    ":hover": {
      opacity: 0.7,
    },
  },
]);
