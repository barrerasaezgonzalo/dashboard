"use client";

import { createContext, ReactNode, useEffect, useState } from "react";

import type { User } from "@supabase/supabase-js";
import { supabase } from "@/app/lib/supabase";
import { errorLogger } from "@/app/lib/errorLogger";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });

    if (error) {
      errorLogger.logError("Error al iniciar sesión con Google", error, {
        context: "AuthProvider",
        userMessage: "No se pudo iniciar sesión. Por favor, intenta de nuevo.",
      });
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      errorLogger.logError("Error al cerrar sesión", error, {
        context: "AuthProvider",
        userMessage: "No se pudo cerrar sesión. Por favor, intenta de nuevo.",
      });
      throw error;
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),

        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
