import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { IngredientToAdd, IngredientToDelete, StorageType } from '.';
import { IngredientType, InventoryProps } from './types';

// Create collection
export const useCreateInventoryCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const createInventoryCollection = async () => {
    if (currentUser) {
      setIsLoading(true);
      const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

      if (!inventoryCollectionRef) {
        await setDoc(doc(db, 'inventory', currentUser.uid), {
          pantry: {
            dryPan: [],
            freezer: [],
            fridge: [],
          },
        });

        setIsLoading(false);
      }
    }
  };

  return { createInventoryCollection, isLoading };
};

// Filter by storage type
export const useInventoryIngredients = ({ storageType }: InventoryProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredients, setIngredients] = useState<IngredientType[]>([]);
  const { currentUser } = useAuthContext();

  const getInventory = useCallback(async () => {
    if (currentUser) {
      const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

      setIsLoading(true);
      const docSnap = await getDoc(inventoryCollectionRef);

      if (docSnap.exists()) {
        setIngredients(docSnap.get('pantry')[storageType]);
        setIsLoading(false);
      }
    }
  }, [currentUser, storageType]);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  return { ingredients, isLoading, getInventory };
};

export const useAddToInventory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const addToInventory = async ({ storage, ...rest }: IngredientToAdd) => {
    if (currentUser) {
      setIsLoading(true);
      const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

      const docSnap = await getDoc(inventoryCollectionRef);

      if (docSnap.exists()) {
        const currentPantryData = docSnap.get('pantry');
        const existingIngredient = currentPantryData[storage].find(
          (el: IngredientType) => el.id === rest.id,
        );

        await setDoc(doc(db, 'inventory', currentUser.uid), {
          ...currentPantryData,
          [storage]: existingIngredient
            ? currentPantryData[storage].map((el: IngredientType) =>
                el.id === rest.id ? { ...el, quantity: el.quantity + 1 } : el,
              )
            : [...currentPantryData[storage], { ...rest, quantity: 1 }],
        });

        setIsLoading(false);
      }
    }
  };

  return { addToInventory, isLoading };
};

export const useDeleteFromInventory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const deleteFromInventory = async ({
    ingredientId,
    storage,
  }: IngredientToDelete) => {
    if (currentUser) {
      const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

      const docSnap = await getDoc(inventoryCollectionRef);

      if (docSnap.exists()) {
        const currentPantryData = docSnap.get('pantry');
        const existingIngredient: IngredientType | undefined =
          currentPantryData[storage].find(
            (el: IngredientType) => el.id === ingredientId,
          );

        await setDoc(doc(db, 'inventory', currentUser.uid), {
          ...currentPantryData,
          [storage]:
            existingIngredient && existingIngredient.quantity - 1 === 0
              ? currentPantryData[storage].filter(
                  (el: IngredientType) => el.id !== ingredientId,
                )
              : currentPantryData[storage],
        });

        setIsLoading(false);
      }
    }
  };

  return { deleteFromInventory, isLoading };
};
