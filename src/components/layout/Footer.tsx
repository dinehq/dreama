import { LogoIcon } from "@/components/icons";
import LocaleLink from "@/components/layout/LocaleLink";
import ThemeToggle from "@/components/ui/ThemeToggle";
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
    <footer className="pb-5 md:pb-10 lg:pb-20">
      <div className="relative mx-auto flex max-w-360 flex-col gap-2 py-4 page-gutter sm:min-h-17 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center">
            <LocaleLink locale={locale} />
            <div className="mx-4 h-4 w-px bg-ink/10" />
            <ThemeToggle />
          </div>
          <p className="hidden text-xs text-ink/40 sm:block">
            {dict.copyright}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 text-xs text-ink/40 sm:hidden">
          <span>{dict.copyright}</span>
          <span>{ICP_NUMBER}</span>
          <span>{NETWORK_SECURITY}</span>
        </div>

        <div className="absolute inset-y-4 left-1/2 hidden -translate-x-1/2 items-center sm:flex">
          <LogoIcon variant="anime-avatar" className="h-full w-auto" />
        </div>

        <div className="hidden flex-col items-end gap-2 sm:flex">
          <p className="text-right text-xs whitespace-nowrap text-ink/40">
            {ICP_NUMBER}
          </p>
          <p className="text-right text-xs whitespace-nowrap text-ink/40">
            {NETWORK_SECURITY}
          </p>
        </div>
      </div>
    </footer>
  );
}
