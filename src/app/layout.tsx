import { Header } from "@/components/Pages";
import { getSiteConfig } from "@/utils/config";

import "../css/global.css";
import "../css/prism-theme.css";
import "react-notion-x/src/styles.css";

export const metadata = getSiteConfig("meta");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
