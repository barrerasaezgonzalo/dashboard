"use client";

import { DashboardLinks } from "./DashboardLinks";
import { Notifications } from "./Notifications";
import { Logout } from "./Logout";
import { useHeader } from "@/app/hooks/useHeader";

export function Header() {
  const header = useHeader();

  return (
    <header className="sticky top-0 z-50 flex h-[40px] items-center border-b border-neutral-700 bg-neutral-800 pt-1 ">
      <DashboardLinks />

      <Notifications
        dropdownRef={header.dropdownRef}
        setIsDropdownOpen={header.setIsDropdownOpen}
        isDropdownOpen={header.isDropdownOpen}
        notifications={header.notifications}
        count={header.count}
      />

      <Logout
        setIsLogoutOpen={header.setIsLogoutOpen}
        isLogoutOpen={header.isLogoutOpen}
        handleLogout={header.handleLogout}
      />
    </header>
  );
}
