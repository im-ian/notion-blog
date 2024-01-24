import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  space: {
    none: "0",
    small: "4px",
    medium: "8px",
    large: "16px",
    xlarge: "32px",
    xxlarge: "64px",
    xxxlarge: "128px",
    center: "0 auto",
  },
  color: {
    white: "#fff",
    black: "#333",
    darkgray: "#2f3437",

    "gray-50": "#f9fafb",
    "gray-100": "#f3f4f6",
    "gray-200": "#e5e7eb",
    "gray-300": "#d1d5db",
    "gray-400": "#9ca3af",
    "gray-500": "#6b7280",
    "gray-600": "#4b5563",
    "gray-700": "#374151",

    "sub-100": "#e3f2fd",
    "sub-200": "#bbdefb",
    "sub-300": "#90caf9",
    "sub-400": "#64b5f6",
    "sub-500": "#42a5f5",
    "sub-600": "#2196f3",
    "sub-700": "#1e88e5",

    "brand-100": "#c4daff",
    "brand-200": "#8abfff",
    "brand-300": "#4f6fff",
    "brand-400": "#038aff",
    "brand-500": "#1e40ff",
    "brand-600": "#1e3abf",
    "brand-700": "#1e359f",
  },
  borderWidth: {
    none: "0",
    thin: "1px",
    thick: "2px",
    bold: "4px",
    boldest: "8px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    full: "99999px",
  },
  fontFamily: {
    body: "Pretendard, -apple-system, Arial, sans-serif",
  },
  fontSize: {
    "0x": "12px",
    "1x": "16px",
    "2x": "20px",
    "3x": "24px",
    "4x": "32px",
  },
  speed: {
    fast: "0.1s",
    normal: "0.25s",
    slow: "0.5s",
  },
});
