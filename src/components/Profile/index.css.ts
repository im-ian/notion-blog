import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";

export const ProfileStyle = style([
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
      "screen and (min-width: 768px)": {
        width: 120,
      },
      "screen and (min-width: 1024px)": {
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
