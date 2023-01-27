import { SPOON_API_KEY } from '@env';
import { useEffect, useState } from 'react';
import { RecipeListType, RecipesType } from './types';

export const useRecipes = ({
  cuisine,
  diet,
  type,
  maxReadyTime,
  enabled,
  query,
  number,
}: RecipesType) => {
  const [recipeList, setRecipeList] = useState<RecipeListType | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (enabled === true || enabled === undefined) {
      setIsLoading(true);
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOON_API_KEY}&query=${query}&cuisine=${cuisine}&diet=${diet}&type=${type}&maxReadyTime=${maxReadyTime}&number=${number}`,
      )
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          setRecipeList(data);
        });
    }
  }, [cuisine, diet, maxReadyTime, type, enabled, query, number]);
  // funcion, array de depndencias
  return { recipeList, isLoading };
};
