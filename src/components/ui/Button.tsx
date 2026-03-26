interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

/**
 * Green pill button — the primary CTA (e.g. "下载App" in nav).
 * Pass href to render an <a>, otherwise renders a <button>.
 */
export default function Button({
  children,
  href,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-5 h-9 rounded-pill bg-brand text-white text-base font-medium transition-opacity hover:opacity-90 " +
    className;

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }
  return <button className={base}>{children}</button>;
}
