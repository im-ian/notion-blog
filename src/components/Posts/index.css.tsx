import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";

export const PostCardThumbnailClassNames = style([
  sprinkles({
    borderRadius: "medium",
  }),
  {
    overflow: "hidden",
  },
]);
