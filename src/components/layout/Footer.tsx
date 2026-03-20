import { LogoIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="relative max-w-[1440px] mx-auto page-gutter py-4 flex items-center justify-between gap-4">

        {/* Left — text logo + copyright */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <LogoIcon variant="text" className="h-4 w-auto self-start invert-dark" />
          <p className="text-xs text-ink/50 whitespace-nowrap">© 2026 深圳想法流科技有限公司</p>
        </div>

        {/* Center — avatar, absolutely positioned so it doesn't affect footer height */}
        <div className="hidden sm:flex absolute inset-y-4 left-1/2 -translate-x-1/2 items-center">
          <LogoIcon variant="anime-avatar" className="h-full w-auto" />
        </div>

        {/* Right — ICP registration */}
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <p className="text-xs text-ink/50 whitespace-nowrap">粤ICP备2023079495号</p>
          <p className="text-xs text-ink/50 whitespace-nowrap">粤公网安备44030002002060</p>
        </div>

      </div>
    </footer>
  );
}
