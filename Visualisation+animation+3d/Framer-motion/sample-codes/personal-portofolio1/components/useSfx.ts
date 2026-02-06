"use client";

import * as React from "react";

type UseSfxOptions = {
  volume?: number;       // 0..1
  playbackRate?: number; // 0.5..4
};

export function useSfx(src: string, opts: UseSfxOptions = {}) {
  const { volume = 0.7, playbackRate = 1 } = opts;

  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const unlockedRef = React.useRef(false);

  React.useEffect(() => {
    const a = new Audio(src);
    a.preload = "auto";
    a.volume = volume;
    a.playbackRate = playbackRate;
    audioRef.current = a;

    return () => {
      // cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [src, volume, playbackRate]);

  // Unlock audio on first user gesture
  React.useEffect(() => {
    const unlock = async () => {
      if (unlockedRef.current) return;
      const a = audioRef.current;
      if (!a) return;

      try {
        // attempt a tiny play/pause to satisfy gesture requirement
        a.muted = true;
        await a.play();
        a.pause();
        a.currentTime = 0;
        a.muted = false;

        unlockedRef.current = true;
      } catch {
        // If it fails, we'll try again next gesture.
      }
    };

    const events: (keyof WindowEventMap)[] = ["pointerdown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, unlock, { passive: true }));

    return () => events.forEach((e) => window.removeEventListener(e, unlock));
  }, []);

  const play = React.useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      // restart sound if it’s already playing
      a.currentTime = 0;
      await a.play();
    } catch {
      // Autoplay blocked or other error — safely ignore
    }
  }, []);

  const stop = React.useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  }, []);

  return { play, stop };
}