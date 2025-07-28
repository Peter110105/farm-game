export interface Crop {
  name: string;
  type: string; // e.g., 'vegetable', 'fruit'
  icon: string;
  cost: number;
  growthTime: number;  // 成長時間(s)
  harvestAmount: number;// 收穫數量
}
