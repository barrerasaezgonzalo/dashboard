"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Aside } from "@/app/components/Ui/Aside";
import { Header } from "@/app/components/Ui/Header";
import { useAuth } from "@/app/hooks/useAuth";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-900 p-1 text-neutral-200">
      <div className="flex min-h-[calc(100vh-8px)] overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-900">
        <Aside />

        <main className="min-w-0 flex-1">
          <Header />

          <section className="p-5">{children}</section>
        </main>
      </div>
    </div>
  );
}
