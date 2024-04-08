import { createVar, style } from "@vanilla-extract/css";

import { sprinkles } from "../../css/sprinkles.css";

export const LayoutClassName = style([
  sprinkles({
    maxWidth: "1000px",
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
