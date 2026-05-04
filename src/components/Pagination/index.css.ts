import { style } from "@vanilla-extract/css";

import { MediaSize } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { vars } from "@/css/vars.css";

export const PaginationContainerStyle = style([
  sprinkles({
    paddingY: "large",
    paddingX: "medium",
    marginTop: "large",
  }),
  {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.small,
    "@media": {
      [MediaSize.desktop]: {
        justifyContent: "flex-start",
      },
    },
  },
]);

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

export const PaginationItemActiveStyle = style({
  fontWeight: 600,
  cursor: "default",
  selectors: {
    "&&": {
      color: vars.color.white,
      background: vars.color.black,
    },
    ".dark-mode &&": {
      color: vars.color.black,
      background: vars.color.white,
    },
  },
});

export const PaginationItemDisabledStyle = style({
  opacity: 0.35,
  cursor: "not-allowed",
  pointerEvents: "none",
});
