import { Item } from "../item/item.model";

export interface Crop {
  id: number
  seedItem: Item     // 種子物品ID   
  produceItem: Item;  // 收穫物品ID
  growthTime: number;     // 成長時間(s)
  harvestAmount: number;  // 收穫數量
}
