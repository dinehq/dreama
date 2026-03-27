interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  /** "primary" = green CTA (default), "light" = white pill for use on dark backgrounds */
  variant?: "primary" | "light";
}

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-brand text-white hover:opacity-90 transition-opacity px-5 h-9",
  light: "bg-white/95 text-ink-base hover:bg-white transition-colors px-6 py-3",
};

/**
 * Pill button. Pass href to render an <a>, otherwise renders a <button>.
 * variant="primary" — green CTA (default)
 * variant="light"   — white pill for overlaying dark backgrounds
 */
export default function Button({
  children,
  href,
  className = "",
  variant = "primary",
}: ButtonProps) {
  const base =
    `inline-flex items-center justify-center whitespace-nowrap rounded-pill text-base font-medium ${variantClass[variant]} ` +
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
