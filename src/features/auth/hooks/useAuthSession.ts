import { useEffect } from 'react';

import { supabase } from '../../../app/supabaseClient';
import { useAuthStore } from '../authStore';

export const useAuthSession = () => {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};
