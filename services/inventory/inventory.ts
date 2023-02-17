// get (search)
// delete
// post (add)
import { doc, getDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';

export type StorageType = 'dryPan' | 'freezer' | 'fridge';

export type InventoryProps = {
  storageType: StorageType;
};

export type IngredientType = {
  id: number;
  image: string;
  name: string;
  quantity: number;
};

export const useInventoryIngredients = ({ storageType }: InventoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const { currentUser } = useAuthContext();

  const getInventory = useCallback(async () => {
    if (currentUser) {
      const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

      setIsLoading(true);
      const docSnap = await getDoc(inventoryCollectionRef);

      setIsLoading(false);
      if (docSnap.exists()) {
        setIngredients(docSnap.get('pantry')[storageType]);
      }
    }
  }, [currentUser, storageType]);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  return { ingredients, isLoading, getInventory };
};

export const useAddToInventory = () => {};

export const useDeleteFromInventory = () => {};
