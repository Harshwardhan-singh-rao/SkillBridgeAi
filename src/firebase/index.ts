import {initializeApp, getApp, FirebaseApp} from 'firebase/app';
import {getAuth, Auth} from 'firebase/auth';
import {getFirestore, Firestore} from 'firebase/firestore';

import {firebaseConfig} from '@/firebase/config';
import {FirebaseProvider, FirebaseClientProvider} from '@/firebase/client-provider';
import {useCollection} from '@/firebase/firestore/use-collection';
import {useDoc} from '@/firebase/firestore/use-doc';
import {useUser} from '@/firebase/auth/use-user';
import {
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from '@/firebase/provider';

let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

// This function is idempotent, so it can be called multiple times without
// causing any issues. It will only initialize the app once.
export const initializeFirebase = () => {
  try {
    // This will throw an error if the app is not initialized.
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  } catch (e) {
    // If the app is not initialized, we can initialize it here.
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    firestore = getFirestore(app);
  }

  return {app, auth, firestore};
};

export {
  FirebaseProvider,
  FirebaseClientProvider,
  useCollection,
  useDoc,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  useAuth,
};
