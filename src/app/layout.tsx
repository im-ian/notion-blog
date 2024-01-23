import { Header } from "@/components/Pages/Header";
import NotionPageProvider from "@/contexts/NotionContext";
import { getPosts } from "@/services/notion";
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
  const pages = await getPosts();

  return (
    <html lang={"ko"}>
      <head>
        <link rel={"preconnect"} href={"https://fonts.googleapis.com"} />
        <link
          rel={"preconnect"}
          href={"https://fonts.gstatic.com"}
          crossOrigin={"anonymous"}
        />
        <link
          href={
            "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200;300;400;500&display=swap"
          }
          rel={"stylesheet"}
        />
      </head>
      <body>
        <NotionPageProvider pages={pages}>
          <Header />
        </NotionPageProvider>
        {children}
      </body>
    </html>
  );
}
