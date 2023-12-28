import { globalStyle, globalFontFace } from "@vanilla-extract/css";

globalFontFace("Pretendard", {
  src: 'url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css")',
});

globalStyle("*", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html, body, input, .notion-text", {
  width: "100%",
  maxWidth: "100%",
});

globalStyle("html, body, input, .notion-text", {
  fontFamily: "Pretendard, sans-serif",
  fontSize: "16px",
  lineHeight: "1.5",
});

globalStyle(".notion", {
  maxWidth: "100vw !important",
});

globalStyle(".notion-page.notion-page-no-cover", {
  marginTop: "0 !important",
});

globalStyle("a", {
  color: "inherit",
  textDecoration: "none",
});
