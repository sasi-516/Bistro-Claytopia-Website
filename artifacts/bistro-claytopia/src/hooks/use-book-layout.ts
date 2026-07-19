import { useEffect, useState } from "react";

export interface BookLayoutConfig {
  height: number;
  /** Items per column on desktop, or per page on mobile */
  itemsPerColumn: number;
  isMobile: boolean;
}

function getBookLayout(width: number): BookLayoutConfig {
  if (width < 768) {
    return { height: 520, itemsPerColumn: 6, isMobile: true };
  }
  if (width < 1024) {
    return { height: 640, itemsPerColumn: 5, isMobile: false };
  }
  return { height: 680, itemsPerColumn: 6, isMobile: false };
}

export function useBookLayout(): BookLayoutConfig {
  const [layout, setLayout] = useState<BookLayoutConfig>(() =>
    typeof window !== "undefined" ? getBookLayout(window.innerWidth) : getBookLayout(1280)
  );

  useEffect(() => {
    const onResize = () => setLayout(getBookLayout(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return layout;
}
