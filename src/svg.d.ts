// SVGR for *.svg except src/assets/features/** (see next.config.ts); those are StaticImageData.
declare module "*.svg" {
  import type { StaticImageData } from "next/image";
  import type { FC, SVGProps } from "react";
  const svg: FC<SVGProps<SVGSVGElement>> | StaticImageData;
  export default svg;
}
