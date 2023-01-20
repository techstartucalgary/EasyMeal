import { doc, getDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { FavoriteRecipeType } from './types';

export const useFavorites = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<FavoriteRecipeType[] | undefined>(
    undefined,
  );

  const getFavorites = useCallback(async () => {
    if (currentUser) {
      const favoritesCollectionRef = doc(db, 'favorites', currentUser?.uid);

      setIsLoading(true);
      const docSnap = await getDoc(favoritesCollectionRef);

      setIsLoading(false);
      if (docSnap.exists()) {
        setFavorites(docSnap.data().recipes);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  return { favorites, isLoading };
};
