import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="//fonts.googleapis.com" rel="dns-prefetch" />
        <link href="//fonts.gstatic.com" rel="dns-prefetch" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />

        {/* 
        Para usar con Turbopack, descomenta esta línea y modifica config/fonts.ts:
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap" 
          rel="stylesheet" 
        />
        */}
      </Head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
