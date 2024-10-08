import { useState, useEffect } from "react";

export default function useAtBottom(offset = 0) {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtBottom(window.innerHeight + window.scrollY >= document.body.offsetHeight - offset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return isAtBottom;
}