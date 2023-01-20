export interface RecipeData {
  id: number;
  title: string;
  type: string;
  time: string;
  imageFP: string;
}

export const testRecipes: RecipeData[] = [
  {
    id: 1,
    title: 'Pancakes',
    type: 'Breakfast',
    time: '30 mins',
    imageFP: require('../../assets/pancake-1.jpg'),
  },
  {
    id: 2,
    title: 'Butter Pancakes',
    type: 'Breakfast',
    time: '20 mins',
    imageFP: require('../../assets/butter-pancake-r.png'),
  },
  {
    id: 3,
    title: 'Pancakes',
    type: 'Breakfast',
    time: '35 mins',
    imageFP: require('../../assets/pancake-2-r.png'),
  },
  {
    id: 4,
    title: 'Fluffy Pancakes',
    type: 'Breakfast',
    time: '30 mins',
    imageFP: require('../../assets/fluffy-pancake.jpg'),
  },
  {
    id: 5,
    title: 'Fruit Pancakes',
    type: 'Breakfast',
    time: '50 mins',
    imageFP: require('../../assets/fruit-pancakes-r.png'),
  },
  {
    id: 6,
    title: 'Vegan Pancakes',
    type: 'Breakfast',
    time: '25 mins',
    imageFP: require('../../assets/vegan-pancake-r.png'),
  },
  {
    id: 7,
    title: 'Human Meat',
    type: 'Lunch',
    time: '>60 mins',
    imageFP: require('../../assets/protein-pancake.jpg'),
  },
  {
    id: 8,
    title: 'Meat Lovers Pancakes',
    type: 'Breakfast',
    time: '50 mins',
    imageFP: require('../../assets/meatlovers-pancake.jpg'),
  },
];
