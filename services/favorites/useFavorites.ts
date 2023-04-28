import { doc, onSnapshot } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { FavoriteRecipeType } from './types';

export const useFavorites = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteRecipeType[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (currentUser) {
      const favoritesCollectionRef = doc(db, 'favorites', currentUser?.uid);

      setIsLoading(true);

      const unsub = onSnapshot(favoritesCollectionRef, (doc) => {
        if (doc.exists()) {
          setFavorites(doc.data().recipes);
        }
      });

      setIsLoading(false);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, [currentUser]);

  return { favorites, isLoading };
};
