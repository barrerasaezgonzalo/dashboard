"use client";

import { Bell, LogOut } from "lucide-react";

import { Search } from "./Search";
import { ConfirmModal } from "./ConfirmModal";

import { useHeader } from "@/app/hooks/useHeader";
import { dashboardLinks } from "@/app/constants";
import { handleScrollTo } from "@/app/utils";

export function Header() {
  const {
    setIsLogoutOpen,
    isLogoutOpen,
    handleLogout,
    dropdownRef,
    setIsDropdownOpen,
    isDropdownOpen,
    notifications,
    count,
  } = useHeader();

  return (
    <header className="sticky top-0 z-50 flex h-[60px] items-center border-b border-neutral-700 bg-neutral-800 px-5">
      <Search />

      <div className="ml-auto flex items-center gap-2">
        {dashboardLinks.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollTo(item.id)}
              title={item.label}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition hover:bg-neutral-700/60 ${item.classNameSoft}`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>

      <div className="ml-3 flex items-center gap-2">
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-700 hover:text-neutral-200"
          >
            <Bell size={20} />

            {count > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 flex w-80 flex-col gap-2 rounded-xl border border-neutral-700 bg-neutral-800 p-3 shadow-xl">
              <span className="mb-1 px-1 text-xs font-semibold text-neutral-400">
                Notificaciones y alertas
              </span>

              {notifications.map((notification) => {
                const Icon = notification.icon;

                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 p-2.5 text-left transition hover:bg-red-500/20"
                  >
                    <Icon size={16} className="shrink-0 text-red-400" />

                    <span className="text-xs font-medium text-red-400">
                      {notification.title}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsLogoutOpen(true)}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-red-400/50 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={20} />
        </button>
      </div>

      <ConfirmModal
        isOpen={isLogoutOpen}
        variant="warning"
        title="Cerrar sesión"
        description="¿Estás seguro de que quieres cerrar tu sesión?"
        confirmText="Cerrar sesión"
        cancelText="Cancelar"
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}
