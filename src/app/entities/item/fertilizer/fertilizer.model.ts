import { Item } from '../item.model';

export type FertilizerType = 'growth' | 'produce' | 'hybrid';

/**
 * 肥料定義
 * 玩家可購買並使用，效果持續一段時間
 */
export interface Fertilizer extends Item {
  type: 'fertilizer';
  fertilizerType: FertilizerType; // 肥料的作用子類型 ('growth' | 'produce' | 'hybrid')
  // 效果參數
  growthBoost: number; // 作物成長加速倍數 (e.g., 1.5 = +50%)
  produceBoost: number; // 作物產出增加倍數 (e.g., 1.2 = +20%)
  duration: number; // 生效時長（秒）
}
