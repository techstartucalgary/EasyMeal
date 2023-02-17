import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { db } from 'utils/firebase-config';
import { useInventory } from './useInventory';

export function useRemoveFavorites() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const { inventory, getInventory } = useInventory();

  async function removeInventory(id: number, location: string) {
    setIsLoading(true);
    await getInventory();
    if (currentUser) {
      await setDoc(doc(db, 'Inventory', currentUser.uid), {
        pantry: {
          fridge: inventory?.pantry.fridge.filter((el) => el.id !== id),
          freezer: inventory?.pantry.freezer.filter((el) => el.id !== id),
          dryPan: inventory?.pantry.dryPan.filter((el) => el.id !== id),
        },
      });
      await getInventory();
      setIsLoading(false);
    }
  }
  return { removeInventory, isLoading };
}
