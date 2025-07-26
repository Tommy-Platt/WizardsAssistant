import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useRouter } from 'expo-router';

type Tokens = {
  access_token: string;
  refresh_token: string;
};

const AuthContext = createContext<{
  session: Session | null;
  loginWithToken: (tokens: Tokens) => Promise<void>;
}>({
  session: null,
  loginWithToken: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Gets the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listens for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Redirects to main menu if session exists
  useEffect(() => {
    if (session) {
      router.replace('/(tabs)');
    }
  }, [session]);

  // Function to log in with tokens
  // This is used for deep linking and password reset flows
  const loginWithToken = async ({ access_token, refresh_token }: Tokens) => {
    await supabase.auth.setSession({ access_token, refresh_token });
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setSession(session);
    }
  };

  return (
    <AuthContext.Provider value={{ session, loginWithToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);