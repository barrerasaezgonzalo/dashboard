"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { menuItems } from "../../constants";
import { useAside } from "@/app/hooks/useAside";

export function Aside() {
  const { isItemActive } = useAside();

  return (
    <aside className="w-[260px] shrink-0 border-r border-neutral-800 bg-neutral-900">
      <Logo />
      <nav className="mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item);

          return (
            <div key={item.label}>
              <Link
                href={item.href ?? "#"}
                className={[
                  "group relative flex w-full items-start gap-3 px-3 py-3 transition",
                  active ? "bg-blue-500/10 text-white" : "bg-blue-800/10 ",
                ].join(" ")}
              >
                {active && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-600" />
                )}

                <Icon
                  size={17}
                  className={[
                    "mt-0.5 shrink-0",
                    active
                      ? "text-blue-400"
                      : "text-neutral-500 group-hover:text-neutral-300",
                  ].join(" ")}
                />

                <div className="min-w-0">
                  <div className="text-sm font-medium">{item.label}</div>

                  {item.description && (
                    <div className="mt-0.5 text-xs text-neutral-500">
                      {item.description}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
