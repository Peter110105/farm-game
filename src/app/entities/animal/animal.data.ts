import { AnimalType, Animal } from './animal.model';

export const AnimalData: Animal[] = [
  // ===== 雞系列 =====
  {
    id: 0,
    type: 'chicken',
    name: '小雞',
    icon: '🐣',
    cost: 50,
    stage: 'baby',
    bornAt: 0,
    growthTime: 60, // 60 秒後長大
    produceItemId: undefined, // 幼雞不產出
    produceInterval: undefined,
    lastProduceTime: undefined,
  },
  {
    id: 1,
    type: 'chicken',
    name: '雞',
    icon: '🐓',
    cost: 0, // 成年雞不能直接購買
    stage: 'adult',
    bornAt: 0,
    growthTime: 0, // 成年後不再長大
    produceItemId: 100, // 產出：雞蛋 (id: 100)
    produceInterval: 180, // 3 分鐘產一次
    lastProduceTime: 0,
  },

  // ===== 牛系列 =====
  {
    id: 2,
    type: 'cow',
    name: '小牛',
    icon: '🐮',
    cost: 200,
    stage: 'baby',
    bornAt: 0,
    growthTime: 180, // 3 分鐘後長大
    produceItemId: undefined,
    produceInterval: undefined,
    lastProduceTime: undefined,
  },
  {
    id: 3,
    type: 'cow',
    name: '乳牛',
    icon: '🐄',
    cost: 0,
    stage: 'adult',
    bornAt: 0,
    growthTime: 0,
    produceItemId: 101, // 產出：牛奶 (id: 101)
    produceInterval: 360, // 6 分鐘產一次
    lastProduceTime: 0,
  },

  // ===== 羊系列 =====
  {
    id: 4,
    type: 'sheep',
    name: '小羊',
    icon: '🐑',
    cost: 250,
    stage: 'baby',
    bornAt: 0,
    growthTime: 180, // 3 分鐘後長大
    produceItemId: undefined,
    produceInterval: undefined,
    lastProduceTime: undefined,
  },
  {
    id: 5,
    type: 'sheep',
    name: '綿羊',
    icon: '🐏',
    cost: 0,
    stage: 'adult',
    bornAt: 0,
    growthTime: 0,
    produceItemId: 102, // 產出：羊毛 (id: 102)
    produceInterval: 300, // 5 分鐘產一次
    lastProduceTime: 0,
  },
];
