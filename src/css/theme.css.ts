import { sprinkles } from "./sprinkles.css";

export const themeBackground = sprinkles({
  background: {
    lightMode: "white",
    darkMode: "darkgray",
  },
});

export const themeTextColor = sprinkles({
  color: {
    lightMode: "black",
    darkMode: "white",
  },
});
