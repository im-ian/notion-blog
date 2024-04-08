import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";

export const ProfileIconStyle = style([
  sprinkles({
    color: {
      darkMode: "white",
      lightMode: "black",
    },
    marginX: "small",
  }),
]);
