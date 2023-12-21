import { getSiteConfig } from "@/utils/config";

import "../css/global.css";

export const metadata = getSiteConfig("meta");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
