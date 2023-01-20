export type FavoriteRecipeResponse = {
  recipes: FavoriteRecipeType[];
};

export type FavoriteRecipeType = {
  cuisines: string[];
  dishTypes: string[];
  id: number;
  image: string;
  imageType: string;
  pricePerServing: number;
  readyInMinutes: number;
  title: string;
};
