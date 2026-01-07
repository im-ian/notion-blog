import Script from "next/script";

import { Box } from "@/components/Layouts";
import { Header } from "@/components/Pages/Header";
import PostProvider from "@/contexts/Posts";
import { themeBackground } from "@/css/theme.css";
import { getSiteConfig } from "@/utils/config";
import { getPosts } from "@/utils/notion";

import "../css/global.css";
import "../css/prism-theme.css";
import "react-notion-x/src/styles.css";

export const metadata = getSiteConfig("meta");
export const { ga } = getSiteConfig("site");
export const { googleSearchConsole } =
  getSiteConfig("google");
export const { naverSearchAdvisor } =
  getSiteConfig("naver");

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
        {googleSearchConsole.siteVerification && (
          <meta
            name={"google-site-verification"}
            content={googleSearchConsole.siteVerification}
          />
        )}
        {naverSearchAdvisor.siteVerification && (
          <meta
            name={"naver-site-verification"}
            content={naverSearchAdvisor.siteVerification}
          />
        )}
      </head>
      <body className={themeBackground}>
        <PostProvider posts={posts}>
          <Header />
        </PostProvider>
        <Box
          sprinkle={{
            maxWidth: {
              desktop: "1000px",
              tablet: "720px",
              mobile: "720px",
            },
            margin: "center",
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
