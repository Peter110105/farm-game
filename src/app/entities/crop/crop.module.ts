export interface Crop {
  name: string;
  type: string; // e.g., 'vegetable', 'fruit'
  growthTime: number; // in seconds
  icon: string;
  harvestAmount: number;
}
