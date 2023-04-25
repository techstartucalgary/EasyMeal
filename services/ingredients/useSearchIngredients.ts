import { SPOON_API_KEY } from '@env';
import { useEffect, useState } from 'react';
import { IngredientsResponse, SearchIngredientsProps } from './types';

export const useSearchIngredient = ({ query }: SearchIngredientsProps) => {
  const [ingredients, setIngredients] = useState<
    IngredientsResponse | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${SPOON_API_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setIngredients(data);
      });
  }, [query]);

  return { ingredients, isLoading };
};
