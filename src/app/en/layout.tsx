import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { oppoSans, ownersText } from "@/lib/fonts";
import { en } from "@/i18n/en";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    languages: { "zh-CN": "/" },
  },
};

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${oppoSans.variable} ${ownersText.variable}`}
    >
      <head>
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
        <Nav dict={en.nav} />
        {children}
        <Footer dict={en.footer} locale="en" />
      </body>
    </html>
  );
}
