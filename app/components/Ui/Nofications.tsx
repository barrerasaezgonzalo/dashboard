import { useHeader } from "@/app/hooks/useHeader";
import { Bell } from "lucide-react";

export function Notifications() {
  const {
    dropdownRef,
    setIsDropdownOpen,
    isDropdownOpen,
    notifications,
    count,
  } = useHeader();

  return (
    <div className="mr-3 flex items-center gap-2">
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition hover:bg-neutral-700 hover:text-neutral-200"
        >
          <Bell size={30} />

          {count > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 flex w-80 flex-col gap-2 rounded-xl border border-neutral-700 bg-neutral-800 p-3 shadow-xl">
            <span className="mb-1 px-1 text-xl font-semibold text-neutral-400">
              Notificaciones y alertas
            </span>

            {notifications.map((notification) => {
              const Icon = notification.icon;

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-orange-700/10 p-2 text-left transition  mb-2"
                >
                  <Icon size={16} className="shrink-0 text-neutral-500" />

                  <span className="text-lg font-medium text-neutral-500">
                    {notification.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
