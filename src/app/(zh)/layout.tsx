import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { oppoSans, ownersText } from "@/lib/fonts";
import { zh } from "@/i18n/zh";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ThemeScript from "@/components/layout/ThemeScript";
import LocaleRedirect from "@/components/layout/LocaleRedirect";

export const metadata: Metadata = {
  title: zh.meta.title,
  description: zh.meta.description,
  alternates: {
    languages: { en: "/en" },
  },
};

export default function ZhLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`h-full antialiased ${oppoSans.variable} ${ownersText.variable}`}
    >
      <head>
        <ThemeScript />
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/@react-grab/mcp/dist/client.global.js"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="min-h-full font-nav">
        <LocaleRedirect />
        <Nav dict={zh.nav} />
        {children}
        <Footer dict={zh.footer} locale="zh" />
      </body>
    </html>
  );
}
