import { SectionActionButtonProps } from "@/app/types";

const colorClasses = {
  blue: "text-blue-500/50 hover:border-blue-500/80 hover:text-blue-500/80",
  cyan: "text-cyan-500/50 hover:border-cyan-500/80 hover:text-cyan-500/80",
  green: "text-green-500/50 hover:border-green-500/80 hover:text-green-500/80",
  orange:
    "text-orange-500/50 hover:border-orange-500/80 hover:text-orange-500/80",
  indigo:
    "text-indigo-500/50 hover:border-indigo-500/80 hover:text-indigo-500/80",
  amber: "text-amber-500/50 hover:border-amber-500/80 hover:text-amber-500/80",
  yellow:
    "text-yellow-500/50 hover:border-yellow-500/80 hover:text-yellow-500/80",
  gray: "text-gray-500/50 hover:border-gray-500/80 hover:text-gray-500/80",
  violet:
    "text-violet-500/50 hover:border-violet-500/80 hover:text-violet-500/80",
};

export function SectionActionButton({
  onClick,
  icon: Icon,
  color = "blue",
}: SectionActionButtonProps) {
  if (!Icon) {
    return <div className="ml-auto mb-2 h-10 w-10 shrink-0" />;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ml-auto mb-2 flex h-10 w-10 shrink-0 cursor-pointer
        items-center justify-center rounded-lg
        border border-neutral-700 bg-neutral-900/60
        transition
        ${colorClasses[color]}
      `}
    >
      <Icon size={25} />
    </button>
  );
}
