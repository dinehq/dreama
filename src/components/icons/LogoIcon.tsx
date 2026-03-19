import Image from "next/image";

type LogoVariant = "full" | "text" | "avatar";

const LOGO_CONFIG: Record<LogoVariant, { src: string; width: number; height: number; alt: string }> = {
  full:   { src: "/logos/logo-full.svg",  width: 111, height: 36, alt: "造梦次元" },
  text:   { src: "/logos/text-logo.svg",  width: 69,  height: 16, alt: "造梦次元" },
  avatar: { src: "/logos/avatar.svg",     width: 56,  height: 56, alt: "造梦次元" },
};

interface LogoIconProps {
  variant: LogoVariant;
  className?: string;
  /** Fluid mode: image height stretches to 100% of the parent, width follows aspect ratio. */
  fluid?: boolean;
}

export function LogoIcon({ variant, className, fluid }: LogoIconProps) {
  const { src, width, height, alt } = LOGO_CONFIG[variant];
  if (fluid) {
    return (
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes={`${width}px`}
        className={className}
        style={{ height: "100%", width: "auto" }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
