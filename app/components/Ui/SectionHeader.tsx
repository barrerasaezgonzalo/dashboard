import { SectionHeaderProps } from "@/app/types";

export function SectionHeader({
  title,
  description,
  icon: Icon,
  color,
}: SectionHeaderProps) {
  return (
    <div className="min-w-0">
      <h2
        className={`flex items-center gap-2 text-2xl font-semibold text-${color}`}
      >
        <Icon size={20} />
        {title}
      </h2>

      <p className="mt-1 text-sm text-neutral-500">{description}</p>
    </div>
  );
}
