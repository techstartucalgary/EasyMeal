import { SPOONTACULAR_API_KEY } from '@env';
import { useEffect, useState } from 'react';

export const useSearchRecipe = ({ query }: { query: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchRecipeResponse, setSearchRecipeResponse] =
    useState<any>(undefined);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPOONTACULAR_API_KEY}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setSearchRecipeResponse(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [query]);

  return { searchRecipeResponse, isLoading };
};
