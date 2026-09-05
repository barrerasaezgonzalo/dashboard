import { SectionHeaderProps } from "@/app/types";

const colorClasses = {
  blue: "text-blue-500/50 hover:text-blue-500",
  cyan: "text-cyan-500/50 hover:text-cyan-500",
  green: "text-green-500/50 hover:text-green-500",
  orange: "text-orange-500/50 hover:text-orange-500",
  indigo: "text-indigo-500/50 hover:text-indigo-500",
  amber: "text-amber-500/50 hover:text-amber-500",
  gray: "text-gray-500/50 hover:text-gray-500",
  yellow: "text-yellow-500/50 hover:text-yellow-500",
  violet: "text-violet-500/50 hover:text-violet-500",
};

export function SectionHeader({
  title,
  icon: Icon,
  color,
}: SectionHeaderProps) {
  return (
    <div className="min-w-0">
      <h2
        className={`flex items-center gap-2 text-2xl font-semibold transition ${
          colorClasses[color]
        }`}
      >
        <Icon size={25} />
        {title}
      </h2>
    </div>
  );
}
