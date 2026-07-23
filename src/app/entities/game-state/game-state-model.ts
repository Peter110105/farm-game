import { Animal } from '../animal/animal.model';
import { Field } from '../field/field-model';
import { Inventory } from '..//inventory/inventory.model';
import { Quest } from '../quest/quest.model';
import { SeasonType, WeatherType } from '../season/season.model';

export interface GameState {
  // ===== 遊戲基礎狀態 =====
  money: number;
  time: Date;
  // ===== 農田狀態 =====
  fields: Field[];
  farmLv: number;
  // ===== 背包狀態 =====
  inventory: Inventory;
  // ===== 牧場狀態 =====
  animals: Animal[];
  ranchSize: number;
  ranchLv: number;
  // ===== 任務狀態 =====
  activeQuests: Quest[];
  completedQuests: Quest[];
  availableQuests: Quest[];
  // ===== 季節系統狀態（新增） =====
  currentSeason?: SeasonType; // 當前季節
  dayOfSeason?: number; // 季節內的第幾天
  currentWeather?: WeatherType; // 當前天氣
  dayProgressMs?: number; // 當天已累積的遊戲時間（毫秒），用於讀檔精確還原
}
