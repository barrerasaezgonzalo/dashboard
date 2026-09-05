export function DashboardSkeleton() {
  return (
    <section className="flex animate-pulse border border-neutral-700 bg-neutral-900">
      <div className="flex flex-col w-full">
        <div>
          <div className="flex flex-row gap-4 ">
            <div className="mt-4 h-[400px] w-full max-w-[50%] rounded bg-neutral-700/60" />
            <div className="mt-4 h-[400px] w-full max-w-[25%] rounded bg-neutral-700/60" />
            <div className="mt-4 h-[400px] w-full max-w-[25%] rounded bg-neutral-700/60" />
          </div>

          <div className="flex flex-row gap-4">
            <div className="mt-4 h-[400px] w-full max-w-[75%] rounded bg-neutral-700/60" />
            <div className="mt-4 h-[400px] w-full max-w-[25%] rounded bg-neutral-700/60" />
          </div>

          <div className="flex flex-row gap-4">
            <div className="mt-4 h-[400px] w-full max-w-[25%] rounded bg-neutral-700/60" />
            <div className="mt-4 h-[400px] w-full max-w-[50%] rounded bg-neutral-700/60" />
            <div className="mt-4 h-[400px] w-full max-w-[25%] rounded bg-neutral-700/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
