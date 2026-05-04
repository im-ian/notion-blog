import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";

export const PaginationContainerStyle = sprinkles({
  paddingY: "large",
  paddingX: "medium",
  marginTop: "large",
});

export const PaginationItemStyle = style([
  sprinkles({
    paddingX: "medium",
    paddingY: "small",
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
    minWidth: "32px",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      opacity: 0.7,
    },
  },
]);

export const PaginationItemActiveStyle = style([
  sprinkles({
    color: {
      lightMode: "white",
      darkMode: "black",
    },
    background: {
      lightMode: "black",
      darkMode: "white",
    },
  }),
  {
    fontWeight: 600,
    cursor: "default",
  },
]);

export const PaginationItemDisabledStyle = style({
  opacity: 0.35,
  cursor: "not-allowed",
  pointerEvents: "none",
});
