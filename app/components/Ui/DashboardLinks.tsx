import { dashboardLinks } from "@/app/constants";
import { handleScrollTo } from "@/app/utils";

export function DashboardLinks() {
  return (
    <div className="hidden mx-auto md:flex items-center gap-4">
      {dashboardLinks.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleScrollTo(item.id)}
            title={item.label}
            className={`flex cursor-pointer items-center justify-center rounded-lg transition opacity-50 hover:opacity-80 ${item.textColor}`}
          >
            <Icon size={30} />
          </button>
        );
      })}
    </div>
  );
}
