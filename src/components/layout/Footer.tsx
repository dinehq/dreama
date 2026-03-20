import { LogoIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="
        relative mx-auto flex max-w-360 items-center justify-between gap-4 py-4
        page-gutter
      ">

        {/* Left — text logo + copyright */}
        <div className="flex min-w-0 flex-col gap-0.5">
          <LogoIcon variant="text" className="invert-dark h-4 w-auto self-start" />
          <p className="text-xs whitespace-nowrap text-ink/50">© 2026 深圳想法流科技有限公司</p>
        </div>

        {/* Center — avatar, absolutely positioned so it doesn't affect footer height */}
        <div className="
          absolute inset-y-4 left-1/2 hidden -translate-x-1/2 items-center
          sm:flex
        ">
          <LogoIcon variant="anime-avatar" className="h-full w-auto" />
        </div>

        {/* Right — ICP registration */}
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <p className="text-xs whitespace-nowrap text-ink/50">粤ICP备2023079495号</p>
          <p className="text-xs whitespace-nowrap text-ink/50">粤公网安备44030002002060</p>
        </div>

      </div>
    </footer>
  );
}
