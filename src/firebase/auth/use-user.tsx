'use client';

import {useEffect, useState} from 'react';
import {User, onAuthStateChanged, signInAnonymously} from 'firebase/auth';

import {useAuth} from '@/firebase/provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        // Sign in anonymously if no user is authenticated.
        signInAnonymously(auth).catch(error => {
          console.error('Anonymous sign-in failed:', error);
          setLoading(false);
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return {user, loading};
}
