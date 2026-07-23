export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';
export type WeatherType = 'sunny' | 'rainy' | 'cloudy' | 'snowy' | 'stormy';
/**
 * 季節定義（靜態）
 * 用途：定義季節的基本屬性
 */
export interface Season {
  id: SeasonType;
  name: string;           // 中文名稱
  monthStart: number;     // 遊戲月份起始 (1-12)
  monthEnd: number;
  seasonColor: string;    // UI 主題色
  icon: string;
  description: string;
}

/**
 * 天氣定義
 * - growthMultiplier: > 1.0 = 加速；< 1.0 = 減速
 *   例：1.3 表示生長速度提升 30%（實際成長時間 /1.3）
 * - produceMultiplier: 同上，影響產出
 */
export interface Weather {
  type: WeatherType;
  name: string;
  icon: string;
  growthMultiplier: number; // 作物成長速度倍數
  produceMultiplier: number; // 作物產出數量倍數
  description: string;
}

