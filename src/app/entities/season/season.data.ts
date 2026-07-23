import { Season, Weather } from "./season.model";

/**
 * 四季定義
 * 每季約 30 個遊戲天（共 120 天 / 年）
 */
export const SeasonData: Season[] = [
  {
    id: 'spring',
    name: '春季',
    monthStart: 3,
    monthEnd: 5,
    seasonColor: '#90EE90', // 淺綠
    icon: '🌸',
    description: '萬物復甦的季節，適合種植許多作物。氣溫回暖，生長加速。',
  },
  {
    id: 'summer',
    name: '夏季',
    monthStart: 6,
    monthEnd: 8,
    seasonColor: '#FFD700', // 金色
    icon: '☀️',
    description: '炎熱的季節，某些作物生長迅速。日照充足，產出增加。',
  },
  {
    id: 'autumn',
    name: '秋季',
    monthStart: 9,
    monthEnd: 11,
    seasonColor: '#FF8C00', // 橙色
    icon: '🍂',
    description: '豐收的季節，特定作物的黃金時期。溫度舒適，適合多種作物。',
  },
  {
    id: 'winter',
    name: '冬季',
    monthStart: 12,
    monthEnd: 2,
    seasonColor: '#87CEEB', // 天藍
    icon: '❄️',
    description: '寒冷的季節，大多數作物停止生長。僅有冬季作物能存活。',
  },
];

/**
 * 天氣系統
 * 隨機生成，每天切換一次
 */
export const WeatherData: Weather[] = [
  {
    type: 'sunny',
    name: '晴天',
    icon: '☀️',
    growthMultiplier: 1.0,
    produceMultiplier: 1.0,
    description: '完美的種植天氣，作物穩定生長。',
  },
  {
    type: 'rainy',
    name: '雨天',
    icon: '🌧️',
    growthMultiplier: 1.3, // +30% 生長速度
    produceMultiplier: 1.0,
    description: '充足的水分，作物生長加速 30%。',
  },
  {
    type: 'cloudy',
    name: '陰天',
    icon: '☁️',
    growthMultiplier: 0.9, // -10% 生長速度
    produceMultiplier: 1.0,
    description: '光照不足，生長速度減速 10%。',
  },
  {
    type: 'snowy',
    name: '下雪',
    icon: '❄️',
    growthMultiplier: 0.3, // -70% 生長速度（冬季作物除外）
    produceMultiplier: 0.5, // -50% 產出
    description: '寒冷天氣，生長幾乎停止。產出減半。',
  },
  {
    type: 'stormy',
    name: '暴雨',
    icon: '⛈️',
    growthMultiplier: 1.5, // +50% 生長速度（高風險高收益）
    produceMultiplier: 0.7, // -30% 產出
    description: '危險但富有機遇的天氣。作物快速生長 50%',
  },
];
