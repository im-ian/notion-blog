import type { Metadata } from "next";

import { getBlogConfig } from "@/utils/config";

import "./globals.css";

const { meta } = getBlogConfig();
export const metadata = meta;

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
