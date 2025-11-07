'use client';

import {useEffect, useState} from 'react';
import {doc, onSnapshot, DocumentReference} from 'firebase/firestore';
import {useFirestore} from '@/firebase/provider';

export function useDoc<T>(path: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const docRef: DocumentReference = doc(firestore, path);

    const unsubscribe = onSnapshot(
      docRef,
      snapshot => {
        if (snapshot.exists()) {
          const data: T = {
            id: snapshot.id,
            ...snapshot.data(),
          } as T;
          setData(data);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      error => {
        console.error('Error fetching document:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path]);

  return {data, loading};
}
