"use client";

import { usePathname } from "next/navigation";
import { MenuItem } from "../types";

export function useAside() {
  const pathname = usePathname();

  const isItemActive = (item: MenuItem) => {
    if (item.children?.length) {
      return item.children.some((child) => pathname === child.href);
    }
    return pathname === item.href;
  };

  return {
    isItemActive,
  };
}
