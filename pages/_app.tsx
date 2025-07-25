import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { ToastProvider, GlobalLoader } from "@/modules/core/components";
import { fontSans, fontMono } from "@/config/fonts";

import "@/styles/globals.css";
import "@/config/i18n";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <NextThemesProvider enableSystem attribute="class" defaultTheme="light">
        <ToastProvider>
          <GlobalLoader>
            <Component {...pageProps} />
          </GlobalLoader>
        </ToastProvider>
      </NextThemesProvider>
    </HeroUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
