import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

import { vars } from "./vars.css";

import { MediaSize } from "@/constants";

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": MediaSize.tablet },
    desktop: { "@media": MediaSize.desktop },
  },
  defaultCondition: "mobile",
  properties: {
    position: ["relative", "absolute", "fixed", "sticky"],
    maxWidth: ["280px", "720px", "1000px", "100%", "100vw"],
    width: ["100%", "720px", "100vw"],
    height: ["100vh", "2.5rem"],

    display: ["none", "flex", "block", "inline", "inline-block"],
    flexDirection: ["row", "column"],
    alignItems: ["flex-start", "center", "flex-end"],
    gap: vars.space,

    padding: vars.space,
    paddingTop: vars.space,
    paddingRight: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,

    margin: vars.space,
    marginTop: vars.space,
    marginRight: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,

    borderTopWidth: vars.borderWidth,
    borderRightWidth: vars.borderWidth,
    borderBottomWidth: vars.borderWidth,
    borderLeftWidth: vars.borderWidth,
    borderStyle: ["solid", "dashed", "dotted"],
    borderRadius: vars.borderRadius,

    outlineWidth: vars.borderWidth,
    outlineStyle: ["solid", "dashed", "dotted"],

    fontSize: vars.fontSize,
    fontFamily: vars.fontFamily,
    textAlign: ["left", "center", "right"],

    transitionProperty: ["none", "all"],
    transitionDuration: vars.speed,
    transitionTimingFunction: ["ease", "ease-in", "ease-out", "ease-in-out"],
  },
  shorthands: {
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],

    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],

    borderWidth: [
      "borderTopWidth",
      "borderRightWidth",
      "borderBottomWidth",
      "borderLeftWidth",
    ],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: vars.color,
    borderColor: vars.color,
    outlineColor: vars.color,
    background: vars.color,
  },
});

export const sprinkles = createSprinkles(responsiveProperties, colorProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
