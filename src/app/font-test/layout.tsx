import "../globals.css";

export default function FontTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="antialiased">
      <head>
        <style>{`
          @font-face {
            font-family: 'OPPO Sans Full';
            src: url('/fonts/OPPO_Sans_40_SC.woff2') format('woff2');
            font-weight: 100 900;
            font-style: normal;
          }
        `}</style>
      </head>
      <body style={{ fontFamily: "'OPPO Sans Full', 'OPPO Sans 4.0 SC', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
