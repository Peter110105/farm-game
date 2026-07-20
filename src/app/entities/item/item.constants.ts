/**
 * ItemID 常數檔
 * 用途：集中管理所有物品 ID，確保資料一致性
 * 原則：
 * - 種子 ID: 1-100
 * - 作物 ID: 101-200
 * - 動物產品 ID: 201-300
 * - 加工品 ID: 301-???
 * 規則：ID 分配後不可更改（保護存檔相容性）
 */

export const ITEM_ID = {
  // ========== 種子 (1-100) ==========
  WHEAT_SEED: 1,
  CORN_SEED: 2,
  CARROT_SEED: 3,
  APPLE_SEED: 4,
  STRAWBERRY_SEED: 5,
  TOMATO_SEED: 6,
  POTATO_SEED: 7,

  // ========== 作物 (101-200) ==========
  WHEAT: 101,
  CORN: 102,
  CARROT: 103,
  APPLE: 104,
  STRAWBERRY: 105,
  TOMATO: 106,
  POTATO: 107,

  // ========== 動物產品 (201-300) ==========
  EGG: 201,
  MILK: 202,
  WOOL: 203,
  HONEY: 204,

  // ========== 加工品 (301-???) ==========
  TOAST: 301,
  CHEESE: 302,
  BUTTER: 303,
  BREAD: 304,
  CAKE: 305,
  JAM: 306,
  PIZZA: 307,
  YOGURT: 308,
  FRIES: 309,
  KETCHUP: 310,
} as const;

// 類型導出（TypeScript 類型檢查）
export type ItemID = (typeof ITEM_ID)[keyof typeof ITEM_ID];

/**
 * 驗證 ID 是否存在於常數中
 * @param id - 物品 ID
 * @returns boolean
 */
export function isValidItemId(id: number): id is ItemID {
  return Object.values(ITEM_ID).includes(id as ItemID);
}
