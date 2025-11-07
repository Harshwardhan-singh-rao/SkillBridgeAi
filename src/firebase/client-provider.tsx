'use client';

import {useEffect, useState} from 'react';
import {Auth, getAuth} from 'firebase/auth';
import {FirebaseApp} from 'firebase/app';
import {Firestore, getFirestore} from 'firebase/firestore';

import {FirebaseProvider} from '@/firebase/provider';
import {initializeFirebase} from '@/firebase';

// NOTE: This is a client-only provider that will not be rendered on the server.
// It is used to initialize Firebase on the client-side and provide the
// Firebase context to its children.
export function FirebaseClientProvider({children}: {children: React.ReactNode}) {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [firestore, setFirestore] = useState<Firestore | null>(null);
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // We are only initializing Firebase on the client-side.
    // This is to prevent any server-side rendering issues.
    // The `initializeFirebase` function is responsible for creating a new
    // Firebase app instance and returning the app, firestore, and auth.
    // The `initializeFirebase` function is idempotent, so it will only
    // initialize the app once.
    const {app, firestore, auth} = initializeFirebase();
    setFirebaseApp(app);
    setFirestore(firestore);
    setAuth(auth);
  }, []);

  return (
    <FirebaseProvider app={firebaseApp} firestore={firestore} auth={auth}>
      {children}
    </FirebaseProvider>
  );
}
