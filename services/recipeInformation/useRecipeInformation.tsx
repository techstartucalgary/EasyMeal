import { SPOON_API_KEY } from '@env';
import { useEffect, useState } from 'react';
import { RecipeInformationType } from './types';

type RecipeType = {
  id?: number;
};

export const useRecipeInformation = ({ id }: RecipeType) => {
  const [recipeInformation, setRecipeInformation] = useState<
    RecipeInformationType | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOON_API_KEY}&includeNutrition=true`,
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setRecipeInformation(data);
      });
  }, [id]);
  return { recipeInformation, isLoading };
};
