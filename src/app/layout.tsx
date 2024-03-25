import Script from "next/script";

import { Header } from "@/components/Pages/Header";
import NotionPageProvider from "@/contexts/NotionContext";
import { themeBackground } from "@/css/theme.css";
import { getPosts } from "@/services/notion";
import { getSiteConfig } from "@/utils/config";

import "../css/global.css";
import "../css/prism-theme.css";
import "react-notion-x/src/styles.css";

export const metadata = getSiteConfig("meta");
export const { ga } = getSiteConfig("site");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getPosts();

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
        {ga && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            />
            <Script>{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${ga}');
            `}</Script>
          </>
        )}
      </head>
      <body className={themeBackground}>
        <NotionPageProvider posts={posts}>
          <Header />
        </NotionPageProvider>
        {children}
      </body>
    </html>
  );
}
