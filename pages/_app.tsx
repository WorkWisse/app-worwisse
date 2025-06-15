import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { ToastProvider } from "@/modules/core/components";
import { fontSans, fontMono } from "@/config/fonts";

import "@/styles/globals.css";
import "@/config/i18n";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider defaultTheme="light" attribute="class" enableSystem>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
