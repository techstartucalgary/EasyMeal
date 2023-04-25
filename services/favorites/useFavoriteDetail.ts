import { doc, getDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { FavoriteRecipeType } from './types';

export const useFavoriteDetail = (id: number) => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [favorite, setFavorite] = useState<FavoriteRecipeType | undefined>(
    undefined,
  );

  const getFavoriteDetail = useCallback(async () => {
    if (currentUser) {
      const favoritesCollectionRef = doc(db, 'favorites', currentUser.uid);

      setIsLoading(true);
      const docSnap = await getDoc(favoritesCollectionRef);

      setIsLoading(false);
      if (docSnap.exists()) {
        setFavorite(
          docSnap.get('recipes').find((el: FavoriteRecipeType) => el.id === id),
        );
      }
    }
  }, [currentUser, id]);

  useEffect(() => {
    if (currentUser) {
      getFavoriteDetail();
    }
  }, [getFavoriteDetail, currentUser]);

  return { favorite, isLoading, getFavoriteDetail };
};
