export interface RecipeData {
  id: number;
  title: string;
  type: string;
  time: string;
}

export const testRecipes: RecipeData[] = [
  { id: 1, title: 'Pancakes', type: 'Breakfast', time: '30 mins' },
  { id: 2, title: 'Butter Pancakes', type: 'Breakfast', time: '20 mins' },
];
