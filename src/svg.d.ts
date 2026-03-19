// Type for SVG files imported as React components via @svgr/webpack.
// Usage: import Icon from '@/components/icons/my-icon.svg'
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const SVG: FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}
