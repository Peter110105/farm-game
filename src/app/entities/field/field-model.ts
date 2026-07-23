import { Crop } from '../crop/crop.model';

export interface Field {
  status: 'empty' | 'planted' | 'grown' | 'wilted'; // 狀態
  plantedAt: number | null; // 種植時間
  crop: Crop | null; // 農作物
  appliedFertilizers: AppliedFertilizer[];
}

/**
 * 已施用肥料狀態（追蹤每個農田格的肥料效果）
 */
export interface AppliedFertilizer {
  fertilizerId: number;
  appliedAt: number; // 施用時間戳 (毫秒)
  duration: number; // 持續時長（秒）
}
