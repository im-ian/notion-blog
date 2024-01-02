import { sprinkles } from "@/css/sprinkles.css";
import { style } from "@vanilla-extract/css";

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

    borderColor: "gray-100",
    borderTopWidth: "none",
    borderRightWidth: "none",
    borderBottomWidth: "thin",
    borderLeftWidth: "none",
    borderStyle: "solid",
  }),
  {
    top: 0,
    zIndex: 1,
    backgroundColor: "white",
  },
]);
