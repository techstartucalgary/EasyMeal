export type StorageType = 'dryPan' | 'freezer' | 'fridge';

export type InventoryProps = {
  storageType: StorageType;
};

export type IngredientType = {
  id: number;
  image: string;
  name: string;
  quantity: number;
};

export interface IngredientToAdd extends IngredientType {
  storage: StorageType;
}

export type IngredientToDelete = {
  ingredientId: number;
  storage: StorageType;
};
