"use client";

import { useRef } from "react";

export function useHorizontalScroll() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const amount = 200;

    container.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return {
    scrollContainerRef,
    scroll,
  };
}
