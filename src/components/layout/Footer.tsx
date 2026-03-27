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
  const copyright = <p className="text-xs text-ink/40">{dict.copyright}</p>;

  return (
    <footer className="pb-5 md:pb-10 lg:pb-20">
      <div className="relative mx-auto flex min-h-17 max-w-360 items-center justify-between gap-4 page-gutter">
        {/* Left — text logo + lang switch + copyright (zh only) */}
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-3">
            <LogoIcon
              variant="text"
              className={` ${locale === "en" ? "h-3" : "h-4"} w-auto text-ink/40`}
              locale={locale}
            />
            <LocaleLink locale={locale} />
          </div>
          {copyright}
        </div>

        {/* Center — avatar, absolutely positioned so it doesn't affect footer height */}
        <div className="absolute inset-y-4 left-1/2 hidden -translate-x-1/2 items-center sm:flex">
          <LogoIcon variant="anime-avatar" className="h-full w-auto" />
        </div>

        {/* Right — ICP registration + copyright (en) */}
        <div className="flex flex-col items-end gap-1">
          <p className="text-right text-[10px] text-ink/40 sm:text-xs sm:whitespace-nowrap">
            {ICP_NUMBER}
          </p>
          <p className="text-right text-[10px] text-ink/40 sm:text-xs sm:whitespace-nowrap">
            {NETWORK_SECURITY}
          </p>
        </div>
      </div>
    </footer>
  );
}
