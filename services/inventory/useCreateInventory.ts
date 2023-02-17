import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { db } from 'utils/firebase-config';

export function useCreateInventory() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  async function createInventory() {
    setIsLoading(true);
    if (currentUser) {
      await setDoc(doc(db, 'inventory', currentUser.uid), {
        pantry: {
          freezer: [],
          fridge: [],
          dryPan: [],
        },
      });
      setIsLoading(false);
    }
  }
  return { createInventory, isLoading };
}
