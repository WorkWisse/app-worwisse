import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect para mejorar performance */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />

        {/* PWA y Mobile */}
        <link href="/site.webmanifest" rel="manifest" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="WorkWisse" name="apple-mobile-web-app-title" />

        {/* Favicons */}
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link color="#0ea5e9" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#0ea5e9" name="msapplication-TileColor" />
        <meta content="#0ea5e9" name="theme-color" />

        {/* DNS Prefetch para recursos externos */}
        <link href="//fonts.googleapis.com" rel="dns-prefetch" />
        <link href="//fonts.gstatic.com" rel="dns-prefetch" />

        {/* Turbopack: https://turbo.build/pack/docs/features/css#fonts */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        /> */}
      </Head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
