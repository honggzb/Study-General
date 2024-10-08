"use client";

import useAtBottom from '@/lib/use-at-bottom';
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';

interface ChatScrollAnchorProps {
  trackVisibility?: boolean;
}

export function ChatScrollAnchor({ trackVisibility }: ChatScrollAnchorProps) {
  const isAtBottom = useAtBottom();

  const { ref, entry, inView } = useInView({
    trackVisibility: false,
    delay: 100,
    rootMargin: "0px 0px -50px 0px",
  });

  useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start',
      });
    }
  }, [inView, entry, isAtBottom, trackVisibility]);

  return <div ref={ref} className="h-px w-full" />;
}