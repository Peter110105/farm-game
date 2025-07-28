import { Item } from '../item/item.model';

export interface Inventory {
  items: Item[];
  capacity: number;
}