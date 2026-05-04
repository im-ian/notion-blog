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
const { lang } = getSiteConfig("site");
const { mode: defaultTheme } = getSiteConfig("theme");
const { googleSearchConsole, ga } = getSiteConfig("google");
const { naverSearchAdvisor } = getSiteConfig("naver");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getPosts();

  return (
    <html lang={lang}>
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
        {ga.id && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${ga.id}`}
            />
            <Script>{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${ga.id}');
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var defaultTheme = ${JSON.stringify(defaultTheme)};
                var saved = localStorage.getItem("theme");
                var resolved;
                if (saved === "dark" || saved === "light") {
                  resolved = saved;
                } else if (defaultTheme === "light" || defaultTheme === "dark") {
                  resolved = defaultTheme;
                } else {
                  resolved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
                }
                if (resolved === "dark") {
                  document.documentElement.classList.add("dark-mode");
                } else {
                  document.documentElement.classList.remove("dark-mode");
                }
              })();
            `,
          }}
        />
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
            paddingBottom: "xxlarge",
          }}
        >
          {children}
        </Box>
      </body>
    </html>
  );
}
