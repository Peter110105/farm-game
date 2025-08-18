import {Crop} from './crop.model';

export const CropData: Crop[] = [
  { //小麥
    id: 0,
    seedItem: {
        id: 1,
        name: '小麥種子',
        icon: '🌾',
        type: 'seed',
        price: 1,
        sellPrice: 0,
        displayOrder: 0,
        description: '基礎作物種子，成長快速。'
    },       
    produceItem: {
        id: 101,
        name: '小麥',
        icon: '🌾',
        type: 'crop',
        price: 0,
        sellPrice: 2,
        displayOrder: 0,
        description: '基礎農作物，可用於製作麵粉。'
    },
    growthTime: 15,    
    harvestAmount: 2
  },
  { //玉米
    id: 1,
    seedItem: {
        id: 2,
        name: '玉米種子',
        icon: '🌽',
        type: 'seed',
        price: 5,
        sellPrice: 0,
        displayOrder: 1,
        description: '營養豐富的作物種子。'
    },    
    produceItem:  {
        id: 102,
        name: '玉米',
        icon: '🌽',
        type: 'crop',
        price: 0,
        sellPrice: 10,
        displayOrder: 1,
        description: '營養豐富的穀物。'
    },
    growthTime: 20, 
    harvestAmount: 1
  },
  { // 胡蘿蔔
    id: 2,
    seedItem: {
        id: 3,
        name: '胡蘿蔔種子',
        icon: '🥕',
        type: 'seed',
        price: 8,
        sellPrice: 0,
        displayOrder: 2,
        description: '根莖類蔬菜種子。'
    },       
    produceItem: {
        id: 103,
        name: '胡蘿蔔',
        icon: '🥕',
        type: 'crop',
        price: 0,
        sellPrice: 15,
        displayOrder: 2,
        description: '富含維生素的根莖類蔬菜。'
    }, 
    growthTime: 30, 
    harvestAmount: 3
  },{ // 蘋果
    id: 3,
    seedItem: {
        id: 4,
        name: '蘋果種子',
        icon: '🍎',
        type: 'seed',
        price: 15,
        sellPrice: 0,
        displayOrder: 3,
        description: '水果樹種子，需要更長時間成長。'
    },    
    produceItem: {
        id: 104,
        name: '蘋果',
        icon: '🍎',
        type: 'crop',
        price: 0,
        sellPrice: 25,
        displayOrder: 3,
        description: '香甜的水果。'
    },
    growthTime: 120, 
    harvestAmount: 5
  },
  { // 草莓
    id: 4,
    seedItem: {
        id: 5,
        name: '草莓種子',
        icon: '🍓',
        type: 'seed',
        price: 20,
        sellPrice: 0,
        displayOrder: 4,
        description: '甜美的漿果種子。'
    },         
    produceItem: {
        id: 105,
        name: '草莓',
        icon: '🍓',
        type: 'crop',
        price: 0,
        sellPrice: 30,
        displayOrder: 4,
        description: '鮮美的漿果。'
    },
    growthTime: 150, 
    harvestAmount: 5
  },
];