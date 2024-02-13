import { style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";

export const PostCardClassName = style([
  sprinkles({
    paddingX: {
      mobile: "large",
      tablet: "large",
    },
    paddingY: {
      mobile: "large",
      tablet: "xlarge",
    },
    borderColor: {
      darkMode: "gray-700",
      lightMode: "gray-200",
    },
    borderWidth: "none",
    borderBottomWidth: "thin",
    borderStyle: "solid",
  }),
]);

export const PostCardThumbnailClassNames = style([
  sprinkles({
    borderRadius: "medium",
    marginBottom: "medium",
  }),
  {
    overflow: "hidden",
  },
]);
