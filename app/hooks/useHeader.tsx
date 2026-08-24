"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { useNotifications } from "./useNotifications";
import { useClickOutside } from "./useClickOutside";

export function useHeader() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { logout } = useAuth();
  const { notifications, count } = useNotifications();

  const handleLogout = async () => {
    await logout();
    setIsLogoutOpen(false);
    router.replace("/login");
  };

  useClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return {
    setIsLogoutOpen,
    isLogoutOpen,
    handleLogout,
    dropdownRef,
    setIsDropdownOpen,
    isDropdownOpen,
    notifications,
    count,
  };
}
