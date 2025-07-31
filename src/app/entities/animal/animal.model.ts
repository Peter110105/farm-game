export type AnimalType = 'chicken' | 'cow' | 'sheep';
export type AnimalStage = 'baby' | 'teen' | 'adult';

export interface Animal {
  id: string;              // 唯一ID，方便管理
  type: AnimalType;        // 動物種類
  name: string;            // 顯示名稱
  icon: string;            // 代表圖示
  stage: AnimalStage;      // 成長階段
  bornAt: number;          // 買入或孵化時間
  nextStageTime: number;   // 預計下一階段時間戳 (ms)
  produceItem?: string;    // 成年後產出的物品名
  produceInterval?: number;// 生產間隔(秒)
  lastProduceTime?: number;// 上次產出時間戳
}
