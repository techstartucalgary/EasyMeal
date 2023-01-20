import { SPOON_API_KEY } from '@env';
import { useEffect, useState } from 'react';
import { RecipeListType, RecipesType } from './types';

export const useRecipes = ({
  cuisine,
  diet,
  type,
  maxReadyTime,
}: RecipesType) => {
  const [recipeList, setRecipeList] = useState<RecipeListType | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${SPOON_API_KEY}&cuisine=${cuisine}&diet=${diet}&type=${type}&maxReadyTime=${maxReadyTime}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setRecipeList(data);
      });
  }, [cuisine, diet, maxReadyTime, type]);
  // funcion, array de depndencias
  return { recipeList, isLoading };
};