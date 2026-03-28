"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { LogoIcon } from "@/components/icons/LogoIcon";

export const APP_STORE_URL = "https://apps.apple.com/app/id6475137705";
export const ANDROID_URL =
  "https://a.app.qq.com/o/simple.jsp?pkgname=com.ideaflow.zmcy";

const SIZE = 152;
const LOGO_SIZE = 38;

const seg =
  "flex-1 px-3 py-1 rounded-full text-xs transition-colors whitespace-nowrap text-center";
const active = `${seg} bg-page-bg text-ink/70 shadow-xs`;
const inactive = `${seg} text-ink/40 hover:text-ink/60 cursor-pointer`;

interface DownloadQRCodeProps {
  playSignal?: number;
}

export function DownloadQRCode({ playSignal }: DownloadQRCodeProps) {
  void playSignal;
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const url = platform === "ios" ? APP_STORE_URL : ANDROID_URL;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full rounded-full bg-ink/5 p-0.5">
        <button
          onClick={() => setPlatform("ios")}
          className={platform === "ios" ? active : inactive}
        >
          iOS
        </button>
        <button
          onClick={() => setPlatform("android")}
          className={platform === "android" ? active : inactive}
        >
          Android
        </button>
      </div>

      <div className="relative text-ink" style={{ width: SIZE, height: SIZE }}>
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter
              id="qr-round"
              x="-5%"
              y="-5%"
              width="110%"
              height="110%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="1.6"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8"
                result="rounded"
              />
              <feComposite in="SourceGraphic" in2="rounded" operator="in" />
            </filter>
          </defs>
        </svg>

        <div style={{ filter: "url(#qr-round)" }}>
          <QRCodeSVG
            key={platform}
            value={url}
            size={SIZE}
            fgColor="currentColor"
            bgColor="transparent"
            level="H"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div style={{ width: LOGO_SIZE, height: LOGO_SIZE }}>
            <LogoIcon variant="anime-avatar" className="size-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
