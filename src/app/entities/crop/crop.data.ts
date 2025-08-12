import {Crop} from './crop.model';

export const CropData: Crop[] = [
  {
    name: '小麥',
    type: 'vegetable',
    icon: '🌾',
    cost: 1,
    growthTime: 10, // 10 seconds
    harvestAmount: 2
  },
  {
    name: '玉米',
    type: 'vegetable',
    icon: '🌽',
    cost: 5,
    growthTime: 20, 
    harvestAmount: 1
  },
  {
    name: '胡蘿蔔',
    type: 'vegetable',
    icon: '🥕',
    cost: 10,
    growthTime: 30, 
    harvestAmount: 1
  },
  {
    name: '蘋果',
    type: 'fruit',
    icon: '🍎',
    cost: 15,
    growthTime: 60, 
    harvestAmount: 3
  },
   {
    name: '草莓',
    type: 'fruit',
    icon: '🍓',
    cost: 20,
    growthTime: 120,
    harvestAmount: 5
  },
];