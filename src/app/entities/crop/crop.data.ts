import { Crop } from './crop.model';

/**
 * * Crop Data - 農作物靜態資料集合
 */
export const CropData: Crop[] = [
  // === 小麥 ===
  {
    id: 0,
    seedItemId: 1, // 小麥種子
    produceItemId: 101, // 小麥
    growthTime: 15,
    harvestAmount: 2,
  },
  // === 玉米 ===
  {
    id: 1,
    seedItemId: 2, // 玉米種子
    produceItemId: 102, // 玉米
    growthTime: 20,
    harvestAmount: 1,
  },
  // === 胡蘿蔔 ===
  {
    id: 2,
    seedItemId: 3, // 胡蘿蔔種子
    produceItemId: 103, // 胡蘿蔔
    growthTime: 30,
    harvestAmount: 3,
  },
  // === 蘋果 ===
  {
    id: 3,
    seedItemId: 4, // 蘋果種子
    produceItemId: 104, // 蘋果
    growthTime: 120,
    harvestAmount: 5,
  },
  // === 草莓 ===
  {
    id: 4,
    seedItemId: 5, // 草莓種子
    produceItemId: 105, // 草莓
    growthTime: 150,
    harvestAmount: 5,
  },
];
