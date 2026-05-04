import { getSiteConfig } from "@/utils/config";
import { FooterContainerStyle, FooterTextStyle } from "./index.css";

export function Footer() {
  const { show, text } = getSiteConfig("footer");
  if (!show) return null;

  return (
    <footer className={FooterContainerStyle}>
      <span className={FooterTextStyle}>{text}</span>
    </footer>
  );
}
