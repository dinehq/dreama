"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LogoIcon } from "@/components/icons/LogoIcon";

export const APP_DOWNLOAD_URL = "https://a.app.qq.com/o/simple.jsp?pkgname=com.ideaflow.zmcy";
const SIZE = 152;
const LOGO_SIZE = 38;

function getInkColor(): string {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--color-ink")
      .trim() || "#242424"
  );
}

interface DownloadQRCodeProps {
  playSignal?: number;
}

export function DownloadQRCode({ playSignal }: DownloadQRCodeProps) {
  const [fgColor, setFgColor] = useState("#242424");

  useEffect(() => {
    const update = () => setFgColor(getInkColor());
    update();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative" style={{ width: SIZE, height: SIZE }}>
      {/* SVG filter — rounds each QR module via gooey blur threshold */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter
            id="qr-round"
            x="-5%" y="-5%" width="110%" height="110%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="blur" />
            <feColorMatrix
              in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8"
              result="rounded"
            />
            <feComposite in="SourceGraphic" in2="rounded" operator="in" />
          </filter>
        </defs>
      </svg>

      <div style={{ filter: "url(#qr-round)" }}>
        <QRCodeSVG
          value={APP_DOWNLOAD_URL}
          size={SIZE}
          fgColor={fgColor}
          bgColor="transparent"
          level="H"
        />
      </div>

      {/* Animated logo overlay — QR level H tolerates up to 30% occlusion */}
      <div className="
        pointer-events-none absolute inset-0 flex items-center justify-center
      ">
        <div style={{ width: LOGO_SIZE, height: LOGO_SIZE }}>
          <LogoIcon variant="anime-avatar" className="size-full" playSignal={playSignal} />
        </div>
      </div>
    </div>
  );
}
