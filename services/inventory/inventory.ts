import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { db } from 'utils/firebase-config';
import {
  IngredientWithStorage,
  IngredientToDelete,
  IngredientType,
  InventoryProps,
  StorageType,
} from './types';

// Create collection
export const useCreateInventoryCollection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();

  const createInventoryCollection = async (
    ingredient?: IngredientWithStorage,
  ) => {
    if (currentUser) {
      setIsLoading(true);
      const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

      const docSnap = await getDoc(inventoryCollectionRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'inventory', currentUser.uid), {
          pantry: {
            dryPan: [],
            freezer: [],
            fridge: [],
            ...(ingredient?.storage
              ? { [ingredient.storage]: [ingredient] }
              : undefined),
          },
        });

        setIsLoading(false);
      }
    }
  };

  return { createInventoryCollection, isLoading };
};

// Filter by storage type
export const useInventoryIngredients = ({
  storageType,
}: InventoryProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientsData, setIngredientsData] = useState<
    IngredientWithStorage[]
  >([]);
  const [{ fridgeCount, freezerCount, dryPanCount }, setCounters] = useState({
    fridgeCount: 0,
    freezerCount: 0,
    dryPanCount: 0,
  });
  const { currentUser } = useAuthContext();

  const getInventory = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

      const docSnap = await getDoc(inventoryCollectionRef);

      if (docSnap.exists()) {
        if (storageType) {
          setIngredientsData(docSnap.get('pantry')[storageType]);
        } else {
          setCounters({
            fridgeCount: docSnap.get('pantry')?.fridge?.length || 0,
            freezerCount: docSnap.get('pantry')?.freezer?.length || 0,
            dryPanCount: docSnap.get('pantry')?.dryPan?.length || 0,
          });
          const response = Object.keys(docSnap.get('pantry')).reduce(
            (acc: IngredientWithStorage[], key) => [
              ...acc,
              ...docSnap.get('pantry')[key].map((el: IngredientType) => ({
                ...el,
                storage: key as StorageType,
              })),
            ],
            [] as IngredientWithStorage[],
          );

          setIngredientsData(response);
        }

        setIsLoading(false);
      }
    }
  }, [currentUser, storageType]);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  const ingredients = ingredientsData.map((el) => ({
    ...el,
    image: `https://spoonacular.com/cdn/ingredients_250x250/${el.image}`,
  }));

  return {
    ingredients,
    isLoading,
    getInventory,
    fridgeCount,
    freezerCount,
    dryPanCount,
  };
};

export const useAddToInventory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const { createInventoryCollection } = useCreateInventoryCollection();

  const addToInventory = useCallback(
    async ({ storage, ...rest }: IngredientWithStorage) => {
      if (currentUser) {
        setIsLoading(true);
        const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

        const docSnap = await getDoc(inventoryCollectionRef);

        if (!docSnap.exists()) {
          await createInventoryCollection({ storage, ...rest });
        } else {
          const currentPantryData = docSnap.get('pantry');

          const existingIngredient = currentPantryData
            ? currentPantryData[storage].find(
                (el: IngredientType) => el.id === rest.id,
              )
            : undefined;

          const payload = {
            pantry: {
              ...currentPantryData,
              [storage]: existingIngredient
                ? currentPantryData[storage].map((el: IngredientType) =>
                    el.id === rest.id ? { ...el, quantity: rest.quantity } : el,
                  )
                : [
                    ...currentPantryData[storage],
                    { ...rest, quantity: rest.quantity },
                  ],
            },
          };

          await setDoc(doc(db, 'inventory', currentUser.uid), payload);

          setIsLoading(false);
        }
      }
    },
    [createInventoryCollection, currentUser],
  );

  return { addToInventory, isLoading };
};

export const useDeleteFromInventory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuthContext();
  const { createInventoryCollection } = useCreateInventoryCollection();

  const deleteFromInventory = useCallback(
    async ({ id, storage }: IngredientToDelete) => {
      if (currentUser) {
        const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

        const docSnap = await getDoc(inventoryCollectionRef);

        if (!docSnap.exists()) {
          await createInventoryCollection();
        } else {
          const currentPantryData = docSnap.get('pantry');

          const existingIngredient: IngredientType | undefined =
            currentPantryData
              ? currentPantryData[storage].find(
                  (el: IngredientType) => el.id === id,
                )
              : undefined;

          const payload = {
            pantry: {
              ...currentPantryData,
              [storage]:
                existingIngredient && existingIngredient.quantity === 1
                  ? currentPantryData[storage].filter(
                      (el: IngredientType) => el.id !== id,
                    )
                  : currentPantryData[storage].map((el: IngredientType) =>
                      el.id === id ? { ...el, quantity: el.quantity - 1 } : el,
                    ),
            },
          };

          await setDoc(doc(db, 'inventory', currentUser.uid), payload);

          setIsLoading(false);
        }
      }
    },
    [createInventoryCollection, currentUser],
  );

  const deleteAllFromInventory = useCallback(
    async ({ id, storage }: IngredientToDelete) => {
      if (currentUser) {
        const inventoryCollectionRef = doc(db, 'inventory', currentUser?.uid);

        const docSnap = await getDoc(inventoryCollectionRef);

        if (!docSnap.exists()) {
          await createInventoryCollection();
        } else {
          const currentPantryData = docSnap.get('pantry');

          const payload = {
            pantry: {
              ...currentPantryData,
              [storage]: currentPantryData[storage].filter(
                (el: IngredientType) => el.id !== id,
              ),
            },
          };

          await setDoc(doc(db, 'inventory', currentUser.uid), payload);

          setIsLoading(false);
        }
      }
    },
    [createInventoryCollection, currentUser],
  );

  return { deleteFromInventory, isLoading, deleteAllFromInventory };
};
