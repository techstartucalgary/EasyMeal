import { doc, getDoc, onSnapshot, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { DailyCookedRecipe, RecipeList } from './types';

const date = format(new Date(), 'YYYY-MM-DD');

export const useDailyCookedRecipes = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [dailyCookedRecipes, setDailyCookedRecipes] = useState<RecipeList>();

  useEffect(() => {
    if (currentUser) {
      setIsLoading(true);
      const dailyCookedRecipesProfile = doc(
        db,
        'daily_cooked_recipes',
        currentUser?.uid,
      );

      const unsub = onSnapshot(dailyCookedRecipesProfile, async (docSnap) => {
        if (docSnap.exists() && docSnap.get(date)) {
          setDailyCookedRecipes(docSnap.get(date) as RecipeList);
        } else {
          const payload: DailyCookedRecipe = {
            [date]: {
              recipes: {},
            },
          };

          await setDoc(
            doc(db, 'daily_cooked_recipes', currentUser.uid),
            payload,
          );
        }
      });

      setIsLoading(false);

      return () => {
        unsub();
      };
    }
    return () => {};
  }, [currentUser]);

  const totalPrice = Object.keys(dailyCookedRecipes?.recipes ?? {}).reduce(
    (acc, curr) => acc + (dailyCookedRecipes?.recipes[curr].price || 0),
    0,
  );

  return {
    dailyCookedRecipes,
    isLoading,
    date,
    totalPrice,
  };
};
