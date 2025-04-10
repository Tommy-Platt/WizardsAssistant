import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { Session } from '@supabase/supabase-js'
import { useRouter } from "expo-router";

const AuthContext = createContext<{
  session: Session | null
}>({
  session: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Get user details and set the session to these details
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Update the session if user details change
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, []);

  // If the session persists, redirect to the main menu.
  useEffect(() => {
    if(session) {
      router.replace("/(tabs)")
    }
  }, [session]);

  return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
