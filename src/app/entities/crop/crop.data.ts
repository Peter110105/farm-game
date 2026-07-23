import { Crop } from './crop.model';
import { ITEM_ID } from '../item/item.constants';

/**
 * * Crop Data - 農作物靜態資料集合
 */
export const CropData: Crop[] = [
  // === 小麥 ===
  {
    seedItemId: ITEM_ID.WHEAT_SEED, // 小麥種子
    produceItemId: ITEM_ID.WHEAT, // 小麥
    growthTime: 15,
    harvestAmount: 2,
    plantableSeasons: ['spring', 'summer'],
  },
  // === 玉米 ===
  {
    seedItemId: ITEM_ID.CORN_SEED, // 玉米種子
    produceItemId: ITEM_ID.CORN, // 玉米
    growthTime: 20,
    harvestAmount: 1,
    plantableSeasons: ['summer', 'autumn'],
  },
  // === 胡蘿蔔 ===
  {
    seedItemId: ITEM_ID.CARROT_SEED, // 胡蘿蔔種子
    produceItemId: ITEM_ID.CARROT, // 胡蘿蔔
    growthTime: 30,
    harvestAmount: 3,
    plantableSeasons: ['spring', 'autumn'],
  },
  // === 蘋果 ===
  {
    seedItemId: ITEM_ID.APPLE_SEED, // 蘋果種子
    produceItemId: ITEM_ID.APPLE, // 蘋果
    growthTime: 120,
    harvestAmount: 5,
    plantableSeasons: ['spring', 'autumn'],
  },
  // === 草莓 ===
  {
    seedItemId: ITEM_ID.STRAWBERRY_SEED, // 草莓種子
    produceItemId: ITEM_ID.STRAWBERRY, // 草莓
    growthTime: 150,
    harvestAmount: 5,
    plantableSeasons: ['spring', 'autumn', 'winter'],
  },
  // === 番茄 ===
  {
    seedItemId: ITEM_ID.TOMATO_SEED,
    produceItemId: ITEM_ID.TOMATO,
    growthTime: 25,
    harvestAmount: 2,
    plantableSeasons: ['summer'], // 只有夏季
  },

  // === 馬鈴薯 ===
  {
    seedItemId: ITEM_ID.POTATO_SEED,
    produceItemId: ITEM_ID.POTATO,
    growthTime: 40,
    harvestAmount: 4,
    plantableSeasons: ['spring', 'autumn'],
  },
];
