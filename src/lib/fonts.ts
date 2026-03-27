import localFont from "next/font/local";

export const oppoSans = localFont({
  src: "../../public/fonts/OPPOSans.subset.woff2",
  variable: "--font-oppo-sans",
  display: "swap",
  weight: "100 900",
});

export const ownersText = localFont({
  src: [
    {
      path: "../../public/fonts/OwnersTRIALText-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/OwnersTRIALText-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/OwnersTRIALText-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-owners-text",
  display: "swap",
});
