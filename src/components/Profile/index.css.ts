import { style } from "@vanilla-extract/css";

import { MediaSize } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";
import { vars } from "@/css/vars.css";

export const ProfileContainerStyle = sprinkles({
  width: "100%",
  maxWidth: {
    desktop: "280px",
    tablet: "100%",
    mobile: "100%",
  },
  textAlign: {
    mobile: "left",
    tablet: "left",
    desktop: "center",
  },
  paddingTop: {
    desktop: "xlarge",
    tablet: "none",
    mobile: "none",
  },
  paddingX: {
    desktop: "none",
    tablet: "large",
    mobile: "large",
  },
});

export const ProfileInnerStyle = style([
  sprinkles({
    paddingY: {
      tablet: "large",
      mobile: "large",
    },
    paddingX: {
      tablet: "large",
      mobile: "large",
    },
    borderRadius: {
      tablet: "large",
      mobile: "large",
    },
  }),
  {
    "@media": {
      [MediaSize.mobile]: {
        background: vars.color["gray-700"],
      },
      [MediaSize.tablet]: {
        background: vars.color["gray-700"],
      },
      [MediaSize.desktop]: {
        background: vars.color["transparent"],
      },
    },
  },
]);

export const ProfileImageStyle = style([
  sprinkles({
    display: "inline-block",
    maxWidth: {
      desktop: "280px",
      tablet: "100%",
      mobile: "100%",
    },
  }),
  {
    aspectRatio: "1 / 1",
    overflow: "hidden",
    width: 80,
    "@media": {
      [MediaSize.tablet]: {
        width: 120,
      },
      [MediaSize.desktop]: {
        width: "60%",
      },
    },
  },
]);

export const ProfileIconStyle = style([
  sprinkles({
    color: {
      darkMode: "white",
      lightMode: "black",
    },
    marginX: "small",
  }),
]);
