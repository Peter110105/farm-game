import {Crop} from './crop.module';

export const CropData: Crop[] = [
  {
    name: 'Wheat',
    type: 'vegetable',
    icon: '🌾',
    cost: 1,
    growthTime: 30, // 30 seconds
    harvestAmount: 2
  },
  {
    name: '玉米',
    type: 'vegetable',
    icon: '🌽',
    cost: 5,
    growthTime: 60, 
    harvestAmount: 1
  },
  {
    name: 'Carrot',
    type: 'vegetable',
    icon: '🥕',
    cost: 10,
    growthTime: 90, 
    harvestAmount: 1
  },
  {
    name: 'Apple',
    type: 'fruit',
    icon: '🍎',
    cost: 15,
    growthTime: 120, // 2 minutes
    harvestAmount: 3
  },
   {
    name: '草莓',
    type: 'fruit',
    icon: '🍓',
    cost: 20,
    growthTime: 300,
    harvestAmount: 5
  },
];