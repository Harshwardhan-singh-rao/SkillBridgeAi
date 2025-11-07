'use client';

import {useEffect, useState} from 'react';
import {User, onAuthStateChanged} from 'firebase/auth';

import {useAuth} from '@/firebase';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true); // Start loading until we know

  useEffect(() => {
    // This effect runs only on the client
    if (!auth) {
      setIsUserLoading(false); // Not loading if there is no auth service
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setIsUserLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return {user, isUserLoading};
}
