export type RecipeList = {
  recipes: {
    [recipeId: string]: {
      price: number;
    };
  };
};

export type DailyCookedRecipe = {
  [key: string]: RecipeList;
};
