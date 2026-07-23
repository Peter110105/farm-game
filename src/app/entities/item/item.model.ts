export type ItemType = 'seed' | 'crop' | 'produce' | 'processed' | 'fertilizer';

export interface Item {
  id: number;
  name: string;
  icon: string;
  type: ItemType;       // 用來讓背包/商店識別這是哪種大類別
  price: number;        // 購買價格
  sellPrice: number;    // 販售價格
  displayOrder: number; // 顯示順序
  description: string;  // 物品描述
}
