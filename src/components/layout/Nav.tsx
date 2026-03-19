import { LogoIcon } from "@/components/icons";
import Button from "@/components/ui/Button";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/5">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 h-14 flex items-center justify-between gap-4">

        {/* Left — logo */}
        <div className="shrink-0 min-w-0">
          <LogoIcon variant="full" />
        </div>

        {/* Center — nav links (hidden below md) */}
        <div className="hidden md:flex items-center gap-9">
          <a href="#features" className="text-[15px] text-ink hover:text-brand transition-colors">
            创作者
          </a>
          <a href="#about" className="text-[15px] text-ink hover:text-brand transition-colors">
            关于我们
          </a>
          <a href="#join" className="text-[15px] text-ink hover:text-brand transition-colors">
            加入我们
          </a>
        </div>

        {/* Right — CTA */}
        <div className="flex items-center gap-4 md:gap-6 shrink-0">
          <a
            href="#"
            className="hidden md:block text-[15px] text-ink hover:text-brand transition-colors"
          >
            创作者登录
          </a>
          <Button>下载App</Button>
        </div>

      </div>
    </nav>
  );
}
