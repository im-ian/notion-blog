import { Header } from "@/components/Pages";
import NotionPageProvider from "@/contexts/NotionContext";
import { getPages } from "@/services/notion";
import { getSiteConfig } from "@/utils/config";

import "../css/global.css";
import "../css/prism-theme.css";
import "react-notion-x/src/styles.css";

export const metadata = getSiteConfig("meta");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pages = await getPages();

  return (
    <html lang={"en"}>
      <body>
        <NotionPageProvider pages={pages}>
          <>
            <Header />
            {children}
          </>
        </NotionPageProvider>
      </body>
    </html>
  );
}
