import React, { createContext, useEffect, useState } from "react";
import { redirect } from "react-router-dom";

import { User } from "@/types/user";
import fetchApi from "@/lib/api-handler";
import { supabase } from "@/lib/supabaseClient";
import { Session } from "@supabase/supabase-js";

type WrapperProps = {
  children: React.ReactNode;
};

interface IAuthContext {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  handleLogout: () => void;
  session: Session | null;
}

const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  isLoading: true,
  session: null,
  handleLogout: () => {},
} as IAuthContext);

const AuthContextWrapper = ({ children }: WrapperProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    try {
      console.log("setData");
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      setSession(session);
      if (error) throw error;
      console.log("session", session);
      setIsLoggedIn(session !== null);

      if (session) {
        const response = await fetchApi("/api/auth/verify");
        console.log("response", response);
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSession();

    // If user is logged in with email/password
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        console.log("Logged in with email/password");
        const response = await fetchApi("/api/auth/verify");
        setUser(response.user);
        setIsLoggedIn(session !== null);
      } else {
        console.log("Logged out");
        setIsLoggedIn(false);
        setUser(null);
        redirect("/welcome");
      }
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUser(null);
      setSession(null);
      redirect("/welcome");
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, handleLogout, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export default AuthContextWrapper;
