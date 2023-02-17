export type InventoryType = {
  pantry: {
    freezer: {
      id: number;
      name: string;
      image: string;
      quantity: number;
    }[];
    fridge: {
      id: number;
      name: string;
      image: string;
      quantity: number;
    }[];
    dryPan: {
      id: number;
      name: string;
      image: string;
      quantity: number;
    }[];
  };
};

export type InventoryItemType = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  location: string;
};
