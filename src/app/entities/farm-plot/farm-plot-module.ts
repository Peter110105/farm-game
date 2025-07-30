import { Crop } from "../crop/crop.module";

export interface FarmPlot {
  status: 'empty' | 'planted' | 'grown'; // 狀態
  plantedAt: number | null; // 種植時間
  crop: Crop | null;  // 農作物
 }
