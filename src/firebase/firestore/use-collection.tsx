'use client';

import {useEffect, useState} from 'react';
import {
  collection,
  query,
  onSnapshot,
  CollectionReference,
  Query,
} from 'firebase/firestore';
import {useFirestore} from '@/firebase/provider';

export function useCollection<T>(path: string) {
  const firestore = useFirestore();
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef: CollectionReference = collection(firestore, path);
    const collectionQuery: Query = query(collectionRef);

    const unsubscribe = onSnapshot(
      collectionQuery,
      snapshot => {
        const data: T[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as T[];
        setData(data);
        setLoading(false);
      },
      error => {
        console.error('Error fetching collection:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, path]);

  return {data, loading};
}
