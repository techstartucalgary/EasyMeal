import { doc, getDoc, setDoc } from '@firebase/firestore';
import { useAuthContext } from 'contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { db } from 'utils/firebase-config';
import { format } from 'utils/date';
import { DailyCookedRecipe, RecipeList } from './types';

export const useDailyCookedRecipes = () => {
  const { currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [dailyCookedRecipes, setDailyCookedRecipes] = useState<RecipeList | {}>(
    {},
  );

  const getDailyCookedRecipes = useCallback(async () => {
    if (currentUser) {
      setIsLoading(true);
      const date = format(new Date(), 'YYYY-MM-DD');
      const dailyCookedRecipesProfile = doc(
        db,
        'daily_cooked_recipes',
        currentUser?.uid,
      );
      const docSnap = await getDoc(dailyCookedRecipesProfile);

      if (docSnap.exists() && docSnap.get(date)) {
        setDailyCookedRecipes(docSnap.get(date) as RecipeList);
      } else {
        const payload: DailyCookedRecipe = {
          [date]: {
            recipes: {},
          },
        };

        await setDoc(doc(db, 'daily_cooked_recipes', currentUser.uid), payload);
      }
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    getDailyCookedRecipes();
  }, [getDailyCookedRecipes]);

  return { dailyCookedRecipes, isLoading, getDailyCookedRecipes };
};
