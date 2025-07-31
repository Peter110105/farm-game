import { AnimalType, Animal } from "./animal.model";

export const AnimalData: Record<AnimalType, {
  name: string;
  icon: string;
  growthStages: number[]; // 每階段成長時間(秒)，如 [60, 120] 代表1分鐘到青年，2分鐘到成年
  produceItem: string;
  produceInterval: number; // 成年後每幾秒產出一次
  price: number;           // 購買價
}> = {
  chicken: {
    name: '小雞',
    icon: '🐣',
    growthStages: [60, 120],
    produceItem: '雞蛋',
    produceInterval: 180,
    price: 50,
  },
  cow: {
    name: '小牛',
    icon: '🐄',
    growthStages: [120, 240],
    produceItem: '牛奶',
    produceInterval: 300,
    price: 200,
  },
  sheep: {
    name: '小羊',
    icon: '🐑',
    growthStages: [90, 180],
    produceItem: '羊毛',
    produceInterval: 240,
    price: 150,
  },
};