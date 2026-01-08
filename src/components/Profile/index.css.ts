import { style } from "@vanilla-extract/css";

import { MediaSize } from "@/constants";
import { sprinkles } from "@/css/sprinkles.css";

export const ResponsiveProfileContainerStyle = sprinkles({
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
    desktop: "large",
    tablet: "none",
    mobile: "none",
  },
  paddingX: {
    desktop: "none",
    tablet: "large",
    mobile: "none",
  },
});

export const ResponsiveProfileInnerStyle = sprinkles({
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
});

export const ResponsiveProfileImageStyle = style([
  sprinkles({
    display: "inline-block",
    maxWidth: {
      desktop: "280px",
      tablet: "100%",
      mobile: "100%",
    },
    borderRadius: "circle",
  }),
  {
    aspectRatio: "1 / 1",
    overflow: "hidden",
    width: 90,
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

export const HorizontalProfileContainerStyle = sprinkles({
  width: "100%",
  paddingX: "large",
  paddingY: "large",
});
