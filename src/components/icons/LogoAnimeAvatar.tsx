"use client";

import { useRef, useState } from "react";

const PLAYBACK_RATE = 2;

function applyPlaybackRate(el: HTMLVideoElement) {
  el.defaultPlaybackRate = PLAYBACK_RATE;
  el.playbackRate = PLAYBACK_RATE;
}

interface LogoAnimeAvatarProps {
  className?: string;
  priority?: boolean;
}

export function LogoAnimeAvatar({ className, priority }: LogoAnimeAvatarProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loopWhilePlaying, setLoopWhilePlaying] = useState(true);

  const mergedClassName = [className, "overflow-hidden rounded-[50%]"]
    .filter(Boolean)
    .join(" ");

  return (
    <video
      ref={ref}
      src="/logos/avatar-anime.mp4"
      loop={loopWhilePlaying}
      muted
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-label="造梦次元"
      className={mergedClassName}
      onLoadedMetadata={(e) => {
        applyPlaybackRate(e.currentTarget);
      }}
      onPlaying={(e) => {
        applyPlaybackRate(e.currentTarget);
      }}
      onEnded={() => {
        const el = ref.current;
        if (!el) return;
        el.pause();
        el.currentTime = 0;
        setLoopWhilePlaying(true);
      }}
      onMouseEnter={() => {
        const el = ref.current;
        if (!el) return;
        setLoopWhilePlaying(true);
        applyPlaybackRate(el);
        void el.play().then(() => {
          applyPlaybackRate(el);
        });
      }}
      onMouseLeave={() => {
        setLoopWhilePlaying(false);
      }}
    />
  );
}
