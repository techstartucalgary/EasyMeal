import { StorageType } from '../../services/inventory/types';

export interface PantryType {
  id: number;
  title: string;
  val: StorageType;
  count: number;
}

export const pantryTypes = [
  {
    id: 0,
    title: 'All',
    val: 'all',
    count: 0,
  },
  {
    id: 1,
    title: 'Fridge',
    val: 'fridge',
    count: 0,
  },
  {
    id: 2,
    title: 'Freezer',
    val: 'freezer',
    count: 0,
  },
  {
    id: 3,
    title: 'Dry Pantry',
    val: 'dryPan',
    count: 0,
  },
];
