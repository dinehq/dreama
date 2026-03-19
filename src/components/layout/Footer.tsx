import Image from "next/image";
import { LogoIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-black/8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 py-4 flex items-center justify-between gap-4">

        {/* Left — brand name + copyright */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <LogoIcon className="shrink-0" />
          <p className="text-xs text-ink/50 whitespace-nowrap">© 2026 深圳想法流科技有限公司</p>
        </div>

        {/* Center — mascot (hidden on small screens to save space) */}
        <Image
          src="/dce94a79f20f749e08e9545104460da7c171bd7a.png"
          alt="造梦次元"
          width={56}
          height={56}
          className="hidden sm:block shrink-0"
        />

        {/* Right — ICP registration */}
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <p className="text-xs text-ink/50 whitespace-nowrap">粤ICP备2023079495号</p>
          <p className="text-xs text-ink/50 whitespace-nowrap">粤公网安备44030002002060</p>
        </div>

      </div>
    </footer>
  );
}
