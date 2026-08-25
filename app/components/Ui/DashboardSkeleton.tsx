export function DashboardSkeleton() {
  return (
    <section className="flex animate-pulse rounded-xl border border-neutral-700 bg-neutral-900 mx-8">
      <div className="flex flex-col ml-2">
        <div className="">
          <div className="flex gap-4 flex-row  justify-space">
            <div className="mt-4 h-100 w-286 rounded bg-neutral-700/60" />
            <div className="mt-4 h-100 w-200 rounded bg-neutral-700/60" />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-row">
            <div className="mt-4 mr-4 h-100 w-195 rounded bg-neutral-700/60" />
            <div className="mt-4 h-100 w-200 rounded bg-neutral-700/60" />
            <div className="mt-4 h-100 w-90 rounded bg-neutral-700/60" />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-row">
            <div className="mt-4 mr-4 h-100 w-195 rounded bg-neutral-700/60" />
            <div className="mt-4 h-100 w-290 rounded bg-neutral-700/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
