import { doc, getDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { InventoryType } from './types';

export const useInventory = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState<InventoryType | undefined>(
    undefined,
  );

  const getInventory = useCallback(async () => {
    if (currentUser) {
      const inventoryCollectionRef = doc(db, 'inventory', currentUser.uid);

      setIsLoading(true);
      const docSnap = await getDoc(inventoryCollectionRef);

      setIsLoading(false);
      if (docSnap.exists()) {
        setInventory(docSnap.data().recipes);
      }
    }
  }, [currentUser]);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  return { inventory, isLoading, getInventory };
};
