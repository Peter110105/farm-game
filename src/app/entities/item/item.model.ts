export type ItemType = 'seed' | 'crop' | 'produce'| 'processed';

export interface Item {
  id: number;
  name: string;
  icon: string;
  type: ItemType; // e.g., 'crop'、produce
  price: number; // 購買價格
  sellPrice: number; // 販售價格
  displayOrder: number; // 顯示順序
  description: string; // 物品描述
}