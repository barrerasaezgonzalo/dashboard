"use client";

import { useState } from "react";
import { useTask } from "./useTask";
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";

export function useHeader() {
  const { overallProgress } = useTask();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setIsLogoutOpen(false);
    router.replace("/login");
  };

  return {
    overallProgress,
    setIsLogoutOpen,
    isLogoutOpen,
    handleLogout,
  };
}
