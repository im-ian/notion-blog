import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";

export const FooterContainerStyle = style([
  sprinkles({
    width: "100%",
    paddingY: "large",
    paddingX: "large",
    marginTop: "xlarge",
    borderTopWidth: "thin",
    borderRightWidth: "none",
    borderBottomWidth: "none",
    borderLeftWidth: "none",
    borderStyle: "solid",
    borderColor: {
      lightMode: "gray-100",
      darkMode: "gray-600",
    },
    color: {
      lightMode: "gray-500",
      darkMode: "gray-300",
    },
    textAlign: "center",
  }),
]);

export const FooterTextStyle = style({
  fontSize: "0.85rem",
});
