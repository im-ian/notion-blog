"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";
import { getSiteConfig } from "@/utils/config";

const { lang } = getSiteConfig("site");

function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang={lang}>
      <body>
        <NextError statusCode={500} />
      </body>
    </html>
  );
}

export default GlobalError;
