import Image from "next/image";
import logoFullImg from "@public/logos/logo-full.png";
import logoFullEnImg from "@public/logos/logo-full-en.png";
import avatarImg from "@public/logos/avatar.png";
import TextLogoZh from "@public/logos/text-logo.svg";
import TextLogoEn from "@public/logos/text-logo-en.svg";
import { LogoAnimeAvatar } from "./LogoAnimeAvatar";

type LogoVariant = "full" | "text" | "avatar" | "anime-avatar";

const LOGO_CONFIG = {
  full:   { src: logoFullImg,  alt: "造梦次元", sizes: "120px" },
  avatar: { src: avatarImg,    alt: "造梦次元", sizes: "60px"  },
} satisfies Record<
  "full" | "avatar",
  { src: unknown; alt: string; sizes: string }
>;

const LOGO_CONFIG_EN: Partial<typeof LOGO_CONFIG> = {
  full: { src: logoFullEnImg, alt: "Dreama", sizes: "120px" },
};

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
  /** Increment to trigger a one-shot playback (anime-avatar only). */
  playSignal?: number;
  locale?: "zh" | "en";
}

export function LogoIcon({ variant, className, priority, playSignal, locale }: LogoIconProps) {
  if (variant === "anime-avatar") {
    return <LogoAnimeAvatar className={className} priority={priority} playSignal={playSignal} />;
  }

  if (variant === "text") {
    const TextLogo = locale === "en" ? TextLogoEn : TextLogoZh;
    return <TextLogo className={className} aria-label={locale === "en" ? "Dreama" : "造梦次元"} />;
  }

  const enOverride = locale === "en" ? LOGO_CONFIG_EN[variant] : undefined;
  const { src, alt, sizes } = enOverride ?? LOGO_CONFIG[variant];
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
