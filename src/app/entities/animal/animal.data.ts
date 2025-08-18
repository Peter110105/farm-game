import { AnimalType, Animal } from "./animal.model";


export const AnimalData: Animal[] = [
  {
    id: 0,
    type: 'chicken',
    name: '小雞',
    icon: '🐣',
    cost: 50,
    stage: 'baby',
    bornAt: 0, // 靜態資料不需要這個，可以設為0
    growthTime: 60, // 60秒後長大
    produceInterval: undefined,
    lastProduceTime: undefined,
  },
  {
    id: 1,
    type: 'chicken',
    name: '雞',
    icon: '🐓',
    cost: 0, // 成年雞不能直接買，所以成本為0
    stage: 'adult',
    bornAt: 0,
    growthTime: 0, // 成年後不再長大
    produceItem: {
        id: 100,
        name: '雞蛋',
        icon: '🥚',
        type: 'produce',
        price: 0,
        sellPrice: 25,
        displayOrder: 0,
        description: '新鮮雞蛋，可用於烹飪。'
    }, 
    produceInterval: 180, // （3分鐘）產蛋
    lastProduceTime: 0,
  },
  {
    id: 2,
    type: 'cow',
    name: '小牛',
    icon: '🐮',
    cost: 200,
    stage: 'baby',
    bornAt: 0,
    growthTime: 180, // 3分鐘後長大
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
    produceItem: {
        id: 101,
        name: '牛奶',
        icon: '🥛',
        type: 'produce',
        price: 0,
        sellPrice: 50,
        displayOrder: 1,
        description: '新鮮牛奶，營養豐富。'
    },
    produceInterval: 360, // 每6分鐘產奶
    lastProduceTime: 0,
  },
  {
    id: 4,
    type: 'sheep',
    name: '小羊',
    icon: '🐑',
    cost: 250,
    stage: 'baby',
    bornAt: 0,
    growthTime: 180, // 3分鐘後長大
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
    produceItem: {
        id: 102,
        name: '羊毛',
        icon: '🧶',
        type: 'produce',
        price: 0,
        sellPrice: 60,
        displayOrder: 2,
        description: '柔軟的羊毛，可用於製作衣物。'
    },
    produceInterval: 300, // 每5分鐘產羊毛
    lastProduceTime: 0,
  },
];