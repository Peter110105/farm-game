import { Item } from "../item/item.model";

/**
 * Crop Model - 農作物基礎定義
 * - 需要物品詳細資訊時，透過 ItemService 動態查詢
 */
export interface Crop {
  seedItemId: number     // 種子物品ID
  produceItemId: number;  // 收穫物品ID
  growthTime: number;     // 成長時間(秒)
  harvestAmount: number;  // 收穫數量
}

/**
 * 完整的 Crop（包含 Item 資訊）
 */
export type DetailedCrop = Crop & {
  seedItem: Item;
  produceItem: Item;
};
