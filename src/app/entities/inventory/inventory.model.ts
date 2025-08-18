import { Item } from "../item/item.model";

export interface InventoryItem extends Item{
  quantity: number;
}

export interface Inventory {
  lv: number;
  items: InventoryItem[];
  capacity: number;
}