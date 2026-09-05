import { dashboardLinks } from "@/app/constants";
import { handleScrollTo } from "@/app/utils";

export function DashboardLinks() {
  return (
    <div className="hidden mx-auto md:flex gap-4">
      {dashboardLinks.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleScrollTo(item.id)}
            title={item.label}
            className={`flex gap-2 cursor-pointer items-center justify-center transition opacity-50 hover:opacity-80 ${item.textColor}`}
          >
            {item.label}
            <Icon size={20} />
          </button>
        );
      })}
    </div>
  );
}
