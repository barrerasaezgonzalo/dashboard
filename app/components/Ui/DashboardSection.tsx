type DashboardSectionProps = {
  id: string;
  children: React.ReactNode;
  header: React.ReactNode;
};

export function DashboardSection({
  id,
  header,
  children,
}: DashboardSectionProps) {
  return (
    <section
      id={id}
      className="w-full min-w-0 rounded-xl border border-neutral-700 bg-neutral-800"
    >
      <div className="flex items-start justify-between gap-3 border-b border-neutral-700 px-5 py-4">
        {header}
      </div>

      {children}
    </section>
  );
}
