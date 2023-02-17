import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { db } from 'utils/firebase-config';
import { useInventory } from './useInventory';
import { InventoryItemType } from './types';

export function useAddToInventory() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const { inventory, getInventory } = useInventory();
  const dryPanInv = inventory?.pantry.dryPan;
  const fridgeInv = inventory?.pantry.fridge;
  const freezerInv = inventory?.pantry.freezer;

  async function addToInventory(newItem: InventoryItemType, location: string) {
    if (location === 'freezer') {
      freezerInv?.push(newItem);
    }
    if (location === 'fridge') {
      freezerInv?.push(newItem);
    }
    if (location === 'dryPan') {
      dryPanInv?.push(newItem);
    }
    setIsLoading(true);
    await getInventory();
    if (currentUser) {
      await setDoc(doc(db, 'inventory', currentUser.uid), {
        pantry: {
          freezer: freezerInv,
          fridge: fridgeInv,
          dryPan: dryPanInv,
        },
      });
      await getInventory();
      setIsLoading(false);
    }
  }
  return { addToInventory, isLoading };
}
