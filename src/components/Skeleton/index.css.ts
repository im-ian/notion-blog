import { keyframes, style } from "@vanilla-extract/css";

import { sprinkles } from "@/css/sprinkles.css";
import { vars } from "@/css/vars.css";

const pulseKeyframes = keyframes({
  "0%": { opacity: 0.8 },
  "50%": { opacity: 0.5 },
  "100%": { opacity: 0.8 },
});

export const container = style([
  sprinkles({
    borderColor: {
      darkMode: "gray-700",
      lightMode: "gray-200",
    },
    borderWidth: "none",
    borderBottomWidth: "thin",
    borderStyle: "solid",
  }),
  {
    width: "100%",
    padding: "16px",
    margin: "0 auto",
  },
]);

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "0.75rem",
  flex: 1,
});

export const line = style([
  sprinkles({
    borderRadius: "medium",
  }),
  {
    height: "12px",
    backgroundColor: vars.color["gray-300"],
    width: "100%",
    animation: `${pulseKeyframes} 1.5s ease-in-out infinite`,
  },
]);
