import { LogoutProps } from "@/app/types";
import { ConfirmModal } from "./ConfirmModal";
import { LogOut } from "lucide-react";

export function Logout({
  setIsLogoutOpen,
  isLogoutOpen,
  handleLogout,
}: LogoutProps) {
  return (
    <>
      <button
        type="button"
        onClick={() => setIsLogoutOpen(true)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-red-400/50 transition hover:bg-red-500/10 hover:text-red-400"
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
    </>
  );
}
