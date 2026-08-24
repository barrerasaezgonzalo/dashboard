"use client";

import { LogIn } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-neutral-200">
      <section className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <LogIn size={22} />
          </div>

          <h1 className="text-2xl font-semibold text-white">Bienvenido</h1>

          <p className="mt-2 text-sm text-neutral-500">
            Inicia sesión para acceder a tu dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          disabled={loading}
          className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Conectando..." : "Entrar con Google"}
        </button>

        <p className="mt-5 text-center text-xs text-neutral-600">
          Acceso seguro mediante Google
        </p>
      </section>
    </main>
  );
}
