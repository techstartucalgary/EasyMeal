import { SPOON_API_KEY } from '@env';
import { useEffect, useState } from 'react';
import { RandomRecipeListType, RandomRecipeType } from './types';

export const useRandomRecipe = ({ numberRecipes }: RandomRecipeType) => {
  const [randomRecipes, setRandomRecipes] = useState<
    RandomRecipeListType | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.spoonacular.com/recipes/random?number=${numberRecipes}&apiKey=${SPOON_API_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setRandomRecipes(data);
      });
  }, [numberRecipes]);
  return { randomRecipes, isLoading };
};
