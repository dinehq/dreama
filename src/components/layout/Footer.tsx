import { LogoIcon } from "@/components/icons";
import LocaleLink from "@/components/layout/LocaleLink";
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
        {/* Logo + lang switch */}
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-3">
            <LogoIcon
              variant="text"
              className={` ${locale === "en" ? "h-3" : "h-4"} w-auto text-ink/40`}
              locale={locale}
            />
            <LocaleLink locale={locale} />
          </div>
          {/* Copyright — desktop only */}
          <p className="hidden text-xs text-ink/40 sm:block">
            {dict.copyright}
          </p>
        </div>

        {/* Mobile — copyright + ICP inline wrapping */}
        <div className="flex flex-wrap gap-x-3 text-xs text-ink/40 sm:hidden">
          <span>{dict.copyright}</span>
          <span>{ICP_NUMBER}</span>
          <span>{NETWORK_SECURITY}</span>
        </div>

        {/* Center — avatar, absolutely positioned so it doesn't affect footer height */}
        <div className="absolute inset-y-4 left-1/2 hidden -translate-x-1/2 items-center sm:flex">
          <LogoIcon variant="anime-avatar" className="h-full w-auto" />
        </div>

        {/* Right — ICP registration, desktop only */}
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
