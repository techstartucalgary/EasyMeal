export interface RecipeInformationType {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: ExtendedIngredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  nutrition: Nutrition;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: any[];
  occasions: any[];
  winePairing: WinePairing;
  instructions: string;
  analyzedInstructions: any[];
  originalId: null;
  spoonacularSourceUrl: string;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: Consistency;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: Measures;
}

export enum Consistency {
  Liquid = 'LIQUID',
  Solid = 'SOLID',
}

export interface Measures {
  us: Metric;
  metric: Metric;
}

export interface Metric {
  amount: number;
  unitShort: string;
  unitLong: string;
}

export interface Nutrition {
  nutrients: Flavonoid[];
  properties: Flavonoid[];
  flavonoids: Flavonoid[];
  ingredients: Ingredient[];
  caloricBreakdown: CaloricBreakdown;
  weightPerServing: WeightPerServing;
}

export interface CaloricBreakdown {
  percentProtein: number;
  percentFat: number;
  percentCarbs: number;
}

export interface Flavonoid {
  name: string;
  amount: number;
  unit: Unit;
  percentOfDailyNeeds?: number;
}

export enum Unit {
  Empty = '',
  G = 'g',
  Iu = 'IU',
  Kcal = 'kcal',
  Mg = 'mg',
  Unit = '%',
  Μg = 'µg',
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
  nutrients: Flavonoid[];
}

export interface WeightPerServing {
  amount: number;
  unit: Unit;
}

export interface WinePairing {
  pairedWines: any[];
  pairingText: string;
  productMatches: any[];
}
