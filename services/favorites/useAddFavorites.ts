import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { db } from 'utils/firebase-config';
import { useFavorites } from './useFavorites';
import { FavoriteRecipeType } from './types';

export function useAddFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const { favorites, getFavorites } = useFavorites();

  async function addFavorites(recipe: FavoriteRecipeType) {
    setIsLoading(true);
    await getFavorites();
    if (currentUser) {
      if (!favorites) {
        await setDoc(doc(db, 'favorites', currentUser.uid), {
          recipes: [recipe],
        });
        setIsLoading(false);
      } else {
        await setDoc(doc(db, 'favorites', currentUser.uid), {
          recipes: [...favorites, recipe],
        });
        await getFavorites();
        setIsLoading(false);
      }
    }
  }
  return { addFavorites, isLoading };
}
