import { SPOON_API_KEY } from '@env';
import { useEffect, useState } from 'react';
import { RecipeInformationType } from './types';

type RecipeType = {
  id?: number;
  enabled?: boolean;
};

export const useRecipeInformation = ({ id, enabled }: RecipeType) => {
  const [recipeInformation, setRecipeInformation] = useState<
    RecipeInformationType | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);
      fetch(
        `https://api.spoonacular.com/recipes/${id}/information?&includeNutrition=true&apiKey=${SPOON_API_KEY}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setRecipeInformation(data);
        });
    }
  }, [id, enabled]);
  return { recipeInformation, isLoading };
};
