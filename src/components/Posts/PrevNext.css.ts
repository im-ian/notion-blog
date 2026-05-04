import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";

export const PrevNextContainerStyle = style([
  sprinkles({
    paddingTop: "large",
    paddingBottom: "large",
    paddingX: "medium",
    marginTop: "large",
    borderTopWidth: "thin",
    borderRightWidth: "none",
    borderBottomWidth: "none",
    borderLeftWidth: "none",
    borderStyle: "solid",
    borderColor: {
      lightMode: "gray-100",
      darkMode: "gray-600",
    },
  }),
]);

export const PrevNextItemStyle = style([
  sprinkles({
    paddingY: "medium",
    paddingX: "medium",
    borderRadius: "small",
    color: {
      lightMode: "black",
      darkMode: "white",
    },
    transitionProperty: "all",
    transitionDuration: "normal",
    transitionTimingFunction: "ease-in-out",
  }),
  {
    flex: "1 1 0",
    minWidth: 0,
    textDecoration: "none",
    display: "block",
    ":hover": {
      opacity: 0.7,
    },
  },
]);

export const PrevNextLabelStyle = style({
  fontSize: "0.85em",
  opacity: 0.7,
});

export const PrevNextTitleStyle = style({
  display: "block",
  marginTop: "4px",
  fontWeight: 600,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});
