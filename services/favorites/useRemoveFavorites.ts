import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { db } from 'utils/firebase-config';
import { useFavorites } from './useFavorites';

export function useRemoveFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const { favorites } = useFavorites();

  async function removeFavorites(id: number) {
    setIsLoading(true);
    if (currentUser) {
      if (!favorites) {
        await setDoc(doc(db, 'favorites', currentUser.uid), {
          recipes: [],
        });
        setIsLoading(false);
      } else {
        await setDoc(doc(db, 'favorites', currentUser.uid), {
          recipes: favorites.filter((el) => el.id !== id),
        });
        setIsLoading(false);
      }
    }
  }
  return { removeFavorites, isLoading };
}
