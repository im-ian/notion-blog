import { createVar, style } from "@vanilla-extract/css";

import { sprinkles } from "../../css/sprinkles.css";

export const LayoutClassName = style([
  sprinkles({
    maxWidth: "720px",
    width: "100%",
    margin: "center",
  }),
]);

export const flexDirectionVariant = createVar();
export const alignItemsVariant = createVar();

export const FlexClassName = style({
  vars: {
    [flexDirectionVariant]: "column",
    [alignItemsVariant]: "center",
  },
  display: "flex",
  flexDirection: flexDirectionVariant,
  alignItems: alignItemsVariant,
});

export const flexVariant = createVar();

export const flexItemClassName = style({
  vars: {
    [flexVariant]: "1",
  },
  flex: flexVariant,
});
