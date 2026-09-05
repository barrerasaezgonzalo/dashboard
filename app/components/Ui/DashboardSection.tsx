"use client";

import { DashboardSectionProps } from "@/app/types";

export function DashboardSection({
  id,
  header,
  children,
  button,
}: DashboardSectionProps) {
  return (
    <section
      id={id}
      className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800 scroll-mt-20 "
    >
      <div className="flex items-start justify-between gap-3 border-b border-neutral-700 px-5 pt-2">
        {header} {button}
      </div>

      {children}
    </section>
  );
}
