import { supabase } from "@/lib/sdk/utilities/supabase";
import { AuthSession } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React from "react";

type SessionContextType = {
  user: AuthSession["user"] | null;
  session: AuthSession | null;
};

export const SessionContext = React.createContext({} as SessionContextType);
export default function SessionContextProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [session, setSession] = React.useState<AuthSession | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" && !router.pathname.includes("/auth")) router.push("/auth/login");
      if (["SIGNED_IN", "INITIAL_SESSION"].includes(event) && session && !router.pathname.includes("/tasks")) {
        setSession(session);

        router.push("/tasks");
      }
      if (!session && router.pathname.includes("/tasks")) router.push("/auth/login");
    });
    return () => {
      if (authListener.subscription) authListener?.subscription?.unsubscribe();
    };
  }, [router]);

  const value: SessionContextType = {
    user: session?.user ?? null,
    session,
  };
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
