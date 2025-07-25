import {Crop} from './crop.module';

export const CropData: Crop[] = [
  {
    name: 'Wheat',
    type: 'vegetable',
    growthTime: 30, // 30 seconds
    icon: '🌾',
    harvestAmount: 2
  },
  {
    name: '玉米',
    type: 'vegetable',
    growthTime: 60, 
    icon: '🌽',
    harvestAmount: 1
  },
  {
    name: 'Carrot',
    type: 'vegetable',
    growthTime: 90, 
    icon: '🥕',
    harvestAmount: 1
  },
  {
    name: 'Apple',
    type: 'fruit',
    growthTime: 120, // 2 minutes
    icon: '🍎',
    harvestAmount: 3
  },
   {
    name: '草莓',
    type: 'fruit',
    growthTime: 300,
    icon: '🍓',
    harvestAmount: 5
  },
];