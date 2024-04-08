import { createVar, style } from "@vanilla-extract/css";

import { sprinkles } from "../../css/sprinkles.css";

export const LayoutClassName = style([
  sprinkles({
    maxWidth: {
      desktop: "1000px",
      tablet: "720px",
      mobile: "100%",
    },
    width: "100%",
    margin: "center",
  }),
]);

export const FlexClassName = style({
  display: "flex",
});

export const flexVariant = createVar();

export const flexItemClassName = style({
  vars: {
    [flexVariant]: "1",
  },
  flex: flexVariant,
});
