"use client";

import { Header } from "@/app/components/Ui/Header";
import { useAuth } from "@/app/hooks/useAuth";
import { ScrollToTop } from "../components/Ui/scrollToTop";
import { DashboardSkeleton } from "../components/Ui/DashboardSkeleton";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { loading } = useAuth();

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200">
      <div className="flex min-h-screen bg-neutral-900">
        <main className="min-w-0">
          <Header />
          <section className="pt-2">{children}</section>
        </main>
      </div>
      <ScrollToTop />
    </div>
  );
}
