import { NotificationsProps } from "@/app/types";
import { Bell } from "lucide-react";

export function Notifications({
  dropdownRef,
  setIsDropdownOpen,
  isDropdownOpen,
  notifications,
  count,
}: NotificationsProps) {
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition hover:bg-neutral-700 hover:text-neutral-200"
      >
        <Bell size={20} />

        {count > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 z-50 mt-2 flex w-80 flex-col gap-2 rounded-xl border border-neutral-700 bg-neutral-800 p-2 shadow-xl">
          <span className="text-center text-base font-semibold text-neutral-400">
            Notificaciones
          </span>

          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <button
                key={notification.id}
                type="button"
                onClick={() => setIsDropdownOpen(false)}
                className="mb-1 flex items-center gap-12 rounded-lg bg-orange-700/10 p-2 text-left transition"
              >
                <Icon size={16} className="shrink-0 text-neutral-500" />

                <span className="text-base font-medium text-neutral-500">
                  {notification.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
