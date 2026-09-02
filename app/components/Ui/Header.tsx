"use client";

import { DashboardLinks } from "./DashboardLinks";
import { Notifications } from "./Nofications";
import { Logout } from "./Logout";

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center border-b border-neutral-700 bg-neutral-800 px-5">
      <DashboardLinks />

      <Notifications />

      <Logout />
    </header>
  );
}
