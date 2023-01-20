export type RecipesType = {
  cuisine?: string;
  diet?: string;
  type?: string;
  maxReadyTime?: number;
  enabled?: boolean;
};

export type RecipeListType = {
  offset: number;
  number: number;
  results: {
    id: number;
    title: string;
    image: string;
    imageType: string;
  }[];
  totalResults: number;
};
