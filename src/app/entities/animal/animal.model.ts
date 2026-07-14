export type AnimalType = 'chicken' | 'cow' | 'sheep';
export type AnimalStage = 'baby' | 'adult';

/**
 * Animal Model - 牲畜基礎定義
 * - 需要物品詳細資訊時，透過 ItemService 動態查詢
 * - 動物的成長流程由 stage 和時間戳控制
 */
export interface Animal {
  id: number;              //
  type: AnimalType;        // 動物種類
  name: string;            // 顯示名稱
  icon: string;            // 代表圖示
  cost: number;            // 購買價
  stage: AnimalStage;      // 成長階段
  bornAt: number;          // 買入或孵化時間
  growthTime: number;   // 預計下一階段時間戳
  produceItemId?: number;    // 成年後產出的物品的ID
  produceInterval?: number;// 生產間隔(秒)
  lastProduceTime?: number;// 上次產出時間戳
}
