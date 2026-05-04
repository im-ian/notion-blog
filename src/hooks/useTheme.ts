import { useEffect, useState } from "react";

import { getSiteConfig } from "@/utils/config";

type Theme = "light" | "dark";

const { mode: defaultTheme } = getSiteConfig("theme");

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;

  if (defaultTheme === "light" || defaultTheme === "dark") return defaultTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const resolved = resolveInitialTheme();
    setTheme(resolved);
    if (resolved === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  };

  return { theme, toggleTheme, mounted };
}
