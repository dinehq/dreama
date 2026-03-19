import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

// next/font/google (Noto Sans SC) requires network access to fonts.gstatic.com at
// build time and is incompatible with Turbopack in offline/restricted environments.
// Font is loaded via a plain <link> tag below instead.
// When OPPO Sans 4.0 SC is available, add @font-face rules in globals.css.

export const metadata: Metadata = {
  title: "造梦次元 — 让想像发生",
  description: "造梦次元 Dreama — AI 驱动的沉浸式创作平台，让每个参与者既是创造者也是世界的延续者。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Noto Sans SC — runtime CDN load, no build-time fetch required */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-nav">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
