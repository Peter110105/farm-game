import { ITEM_ID } from '../item.constants';
import { Fertilizer } from './fertilizer.model';

/**
 * 肥料系統
 * 玩家可在商店購買，使用後應用到特定農田格
 *
 * 設計原則：
 * - 肥料可堆疊在背包
 * - 每個農田格可同時使用多個肥料
 */
export const FertilizerData: Fertilizer[] = [
  {
    id: ITEM_ID.GROWTHFERTILIZER,
    name: '生長肥料',
    icon: '🧂',
    type: 'fertilizer',
    fertilizerType: 'growth',
    price: 50,
    sellPrice: 25,
    displayOrder: 0,
    description:
      '專門加速作物生長。使用後該農田的作物生長速度提升 50%，持續 5 分鐘。',
    growthBoost: 1.5, // +50% 生長
    produceBoost: 1.0, // 不影響產出
    duration: 300, // 5 分鐘
  },
  {
    id: ITEM_ID.YIELDFERTILIZER,
    name: '產出肥料',
    icon: '🌾',
    type: 'fertilizer',
    fertilizerType: 'produce',
    price: 75,
    sellPrice: 37,
    displayOrder: 1,
    description:
      '增加動物和農田的產出。使用後該農田的收穫量增加 30%，動物產出增加 30%，持續 8 分鐘。',
    growthBoost: 1.0, // 不影響生長
    produceBoost: 1.3, // +30% 產出
    duration: 480, // 8 分鐘
  },
  {
    id: ITEM_ID.DELUXEFERTILIZER,
    name: '強效肥料',
    icon: '💎',
    type: 'fertilizer',
    fertilizerType: 'hybrid',
    price: 120,
    sellPrice: 60,
    displayOrder: 2,
    description: '全能型肥料。生長速度提升 40%，產出增加 20%，持續 6 分鐘。',
    growthBoost: 1.4, // +40% 生長
    produceBoost: 1.2, // +20% 產出
    duration: 360, // 6 分鐘
  },
  {
    id: ITEM_ID.THERMALFERTILIZER,
    name: '冬季保溫肥料',
    icon: '🧊',
    type: 'fertilizer',
    fertilizerType: 'growth',
    price: 100,
    sellPrice: 50,
    displayOrder: 3,
    description:
      '專為冬季設計。在下雪天氣時，生長速度提升 80%（從 0.3 變為 0.54）。持續 10 分鐘。',
    growthBoost: 2.7, // 在雪天時：0.3 * 2.7 = 0.81（接近晴天）
    produceBoost: 1.0,
    duration: 600, // 10 分鐘
  },
];
