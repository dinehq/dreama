import Image from "next/image";
import logoFullImg from "@public/logos/logo-full.png";
import avatarImg from "@public/logos/avatar.png";
import { LogoAnimeAvatar } from "./LogoAnimeAvatar";

type LogoVariant = "full" | "text" | "avatar" | "anime-avatar";

const LOGO_CONFIG = {
  full:   { src: logoFullImg,            alt: "造梦次元", sizes: "120px" },
  text:   { src: "/logos/text-logo.svg", alt: "造梦次元", sizes: "72px"  },
  avatar: { src: avatarImg,              alt: "造梦次元", sizes: "60px"  },
} satisfies Record<
  Exclude<LogoVariant, "anime-avatar">,
  { src: unknown; alt: string; sizes: string }
>;

interface LogoIconProps {
  variant: LogoVariant;
  /**
   * Tailwind / CSS class that sets the rendered height (e.g. "h-9").
   * Width is always "auto" so the aspect ratio is preserved.
   * The caller is responsible for providing a height constraint.
   */
  className?: string;
  /** Pass true for above-the-fold logos to avoid LCP penalty. */
  priority?: boolean;
}

export function LogoIcon({ variant, className, priority }: LogoIconProps) {
  if (variant === "anime-avatar") {
    return <LogoAnimeAvatar className={className} priority={priority} />;
  }

  const { src, alt, sizes } = LOGO_CONFIG[variant];
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}
