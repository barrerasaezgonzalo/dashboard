"use client";
import { CheckCircle2, LogOut } from "lucide-react";
import { Search } from "./Search";
import ConfirmModal from "./ConfirmModal";
import { useHeader } from "@/app/hooks/useHeader";

export function Header() {
  const { overallProgress, setIsLogoutOpen, isLogoutOpen, handleLogout } =
    useHeader();

  return (
    <header className="flex h-[60px] items-center border-b border-neutral-700 bg-neutral-800 px-5">
      <Search />

      <div className="flex items-center gap-2 rounded-lg bg-neutral-700/70 px-3 py-1.5 ml-4 h-10">
        <CheckCircle2 size={15} className="text-blue-400" />

        <span className="text-sm font-medium text-neutral-200">
          {overallProgress}% Tareas finalizadas
        </span>
      </div>

      <button
        type="button"
        onClick={() => setIsLogoutOpen(true)}
        className="ml-auto cursor-pointer text-neutral-400 mr-2 transition hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut size={20} />
      </button>

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
