import { LogoIcon } from "@/components/icons";
import type { Dict } from "@/i18n/zh";

const ICP_NUMBER = "粤ICP备2023079495号";
const NETWORK_SECURITY = "粤公网安备44030002002060";

export default function Footer({
  dict,
  locale,
}: {
  dict: Dict["footer"];
  locale: "zh" | "en";
}) {
  return (
    <footer className="border-t border-border">
      <div className="
        relative mx-auto flex max-w-360 items-center justify-between gap-4 py-4
        page-gutter
      ">

        {/* Left — text logo + copyright */}
        <div className="flex min-w-0 flex-col gap-2">
          <LogoIcon variant="text" className={`
            ${locale === "en" ? "h-3" : "h-4"}
            w-auto self-start text-ink/40
          `} locale={locale} />
          <p className="text-xs whitespace-nowrap text-ink/50">{dict.copyright}</p>
        </div>

        {/* Center — avatar, absolutely positioned so it doesn't affect footer height */}
        <div className="
          absolute inset-y-4 left-1/2 hidden -translate-x-1/2 items-center
          sm:flex
        ">
          <LogoIcon variant="anime-avatar" className="h-full w-auto" />
        </div>

        {/* Right — ICP registration (Chinese only) */}
        {locale === "zh" && (
          <div className="flex shrink-0 flex-col items-end gap-1">
            <p className="text-xs whitespace-nowrap text-ink/50">{ICP_NUMBER}</p>
            <p className="text-xs whitespace-nowrap text-ink/50">{NETWORK_SECURITY}</p>
          </div>
        )}

      </div>
    </footer>
  );
}
