import { Injectable } from '@angular/core';
import { GameDataService } from '../../../core/game-data/game-data.service';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { DetailedCrop } from '../../../entities/crop/crop.model';
import { AppliedFertilizer, Field } from '../../../entities/field/field-model';
import { QuestManagerService } from '../../../core/quest-manager/quest-manager.service';
import { CropService } from '../../../entities/crop/service/crop.service';
import { SeasonService } from '../../../entities/season/service/season.service';
import { Fertilizer } from '../../../entities/item/fertilizer/fertilizer.model';
import { FertilizerData } from '../../../entities/item/fertilizer/fertilizer.data';

/**
 * FarmService - 農田業務邏輯服務
 * 職責：
 * 1. 管理農田狀態和農作物種植
 * 2. 計算植物成長狀態
 * 3. 處理收穫邏輯
 * 4. 管理農田升級
 */
@Injectable({
  providedIn: 'root',
})
export class FarmService {
  private _fields: Field[] = Array.from({ length: 9 }, () => ({
    status: 'empty',
    plantedAt: null,
    crop: null,
    appliedFertilizers: [],
  }));

  private _farmLv = 1;
  private _upgradeCost = 100;

  constructor(
    private inventoryService: InventoryService,
    private gameDataService: GameDataService,
    private questManagerService: QuestManagerService,
    private cropService: CropService,
    private seasonService: SeasonService,
  ) {}

  get fields(): Field[] {
    return this._fields;
  }
  set fields(value: Field[]) {
    this._fields = value;
  }
  get farmLv(): number {
    return this._farmLv;
  }
  set farmLv(value: number) {
    this._farmLv = value;
  }
  get upgradeCost(): number {
    return this._upgradeCost;
  }
  set upgradeCost(value: number) {
    this._upgradeCost = value;
  }

  /**
   * 設定農田初始狀態
   * @param fields - 農田格陣列
   * @param farmLv - 農場等級（預設 1）
   */
  setFarm(fields: Field[], farmLv: number = 1): void {
    this.fields = fields;
    this.farmLv = farmLv;
    this.upgradeCost = 50 + (this.farmLv - 1) * 200; // 初始升級成本
  }

  /**
   * 重置農田為初始狀態
   */
  initial() {
    this.fields = Array.from({ length: 9 }, () => ({
      status: 'empty',
      plantedAt: null,
      crop: null,
      appliedFertilizers: [],
    }));
    this.farmLv = 1;
    this.upgradeCost = 50;
  }

  /**
   * 檢查種植條件並嘗試種植
   * @param index - 農田格位置
   * @param crop - 要種植的農作物（應為補全後的 Crop 物件）
   * @returns { success: boolean; message: string }
   * 流程：
   * 1. 檢查是否有足夠金錢
   * 2. 扣除種子成本
   * 3. 執行種植
   */
  tryPlant(
    index: number,
    crop: DetailedCrop,
  ): { success: boolean; message: string } {
    // 檢查農田狀態
    if (this.fields[index].status !== 'empty') {
      return {
        success: false,
        message: '該農田格非空，請先收穫或清除。',
      };
    }
    // 檢查季節限制
    if (!this.seasonService.canPlantInCurrentSeason(crop.plantableSeasons)) {
      const currentSeason =
        this.seasonService.getCurrentSeasonInfo()?.name || '未知季節';
      return {
        success: false,
        message: `此作物不能在 ${currentSeason} 種植。可種植季節：${crop.plantableSeasons.join(', ')}`,
      };
    }

    // 獲取種子物品
    const seedItem = crop.seedItem;
    if (!seedItem) {
      return { success: false, message: '農作物資料不完整，無法種植' };
    }

    // 檢查金錢
    const money = this.gameDataService.money;
    const cost = seedItem.price;
    if (money >= cost) {
      this.gameDataService.subMoney(cost);
      this.plant(index, crop);
      return { success: true, message: `種植成功！` };
    } else {
      return {
        success: false,
        message: `金錢不足，需要 ${cost - money} 金幣才能種植`,
      };
    }
  }

  /**
   * 執行種植操作
   * @param index - 農田格位置
   * @param enrichedCrop - 要種植的農作物（補全後的 Crop 物件）
   */
  plant(index: number, enrichedCrop: DetailedCrop): void {
    const { seedItem, produceItem, ...crop } = enrichedCrop;

    this.fields[index] = {
      status: 'planted',
      plantedAt: this.gameDataService.time.getTime(),
      crop: crop,
      appliedFertilizers: this.fields[index].appliedFertilizers,
    };

    // 更新任務進度：記錄種植了什麼種子
    this.questManagerService.updateProgress('plant', seedItem.id, 1);
  }

  /**
   * 計算實際的作物成長時間
   *
   * 計算邏輯：
   * basetime = crop.growthTime
   * adjusted = basetime / weatherMultiplier / fertilizerBoost
   *
   * 其中：
   * - weatherMultiplier: 天氣加成（雨天快 30% → 1.3）
   * - fertilizerBoost: 肥料加成（生長肥料快 50% → 1.5）
   *
   * @param tile - 農田格
   * @param now - 當前時間戳（毫秒）
   * @returns 調整後的成長時間（毫秒）
   */
  private calculateAdjustedGrowthTime(tile: Field, now: number): number {
    if (!tile.crop) return Infinity;

    let growthTime = tile.crop.growthTime * 1000; // 轉換為毫秒

    // ===== 天氣加成 =====
    const weather = this.seasonService.getCurrentWeather();
    if (weather) {
      growthTime /= weather.growthMultiplier;
    }

    // ===== 肥料加成 =====
    if (tile.appliedFertilizers.length > 0) {
      let totalFertilizerBoost = 1.0;

      for (const fertilizer of tile.appliedFertilizers) {
        const fertilizerData = FertilizerData.find(
          (f) => f.id === fertilizer.fertilizerId,
        );
        if (!fertilizerData) continue;

        // 檢查肥料是否仍在有效期
        const elapsedSinceApply = now - fertilizer.appliedAt;
        if (elapsedSinceApply >= fertilizer.duration * 1000) {
          continue; // 肥料已過期，跳過
        }

        // 只有 'growth' 和 'hybrid' 類型的肥料會加速生長
        if (
          fertilizerData.fertilizerType === 'growth' ||
          fertilizerData.fertilizerType === 'hybrid'
        ) {
          totalFertilizerBoost *= fertilizerData.growthBoost;
        }
      }

      growthTime /= totalFertilizerBoost;
    }

    return growthTime;
  }
  /**
   * 計算植物成長狀態並更新
   * 邏輯：
   * - 檢查每個已種植的農田格
   * - 計算調整後的成長時間（考慮季節、天氣、肥料）
   * - 若成長時間已達標，變更狀態為 'grown'
   * - 若過季，標記為枯萎 'wilted'
   */
  updateGrowth(): void {
    const now = this.gameDataService.time.getTime();
    for (const tile of this.fields) {
      if (tile.status !== 'planted' || !tile.plantedAt || !tile.crop) {
        continue;
      }
      const growthTime = now - tile.plantedAt;
      const adjustedGrowthTime = this.calculateAdjustedGrowthTime(tile, now);

      // 檢查是否已枯萎
      if (
        !this.seasonService.canPlantInCurrentSeason(tile.crop.plantableSeasons)
      ) {
        tile.status = 'wilted';
        console.warn('[FarmService] 農作物已枯萎（已過種植季節）');
      }

      // 檢查是否已成熟
      if (growthTime >= adjustedGrowthTime) {
        tile.status = 'grown';
        continue;
      }
    }
  }

  /**
   * 收穫成熟的農作物
   * 流程：
   * 1. 檢查農田格是否已成熟
   * 2. 檢查背包空間
   * 3. 添加物品到背包
   * 4. 清空農田格
   * 5. 更新任務進度
   *
   * @param index - 農田格位置
   */
  harvest(index: number): void {
    const tile = this.fields[index];

    if (tile.status !== 'grown' || !tile.crop) {
      return;
    }

    const crop = tile.crop;
    const detailedCrop = this.cropService.getCropBySeedId(crop.seedItemId);

    if (!detailedCrop) {
      console.error('查無農作物');
      return;
    }

    const produceItem = detailedCrop.produceItem;
    const harvestAmount = crop.harvestAmount;

    // 計算肥料加成
    let finalHarvestAmount = harvestAmount;
    const now = this.gameDataService.time.getTime();
    if (tile.appliedFertilizers.length > 0) {
      let totalProduceBoost = 1.0;

      for (const fertilizer of tile.appliedFertilizers) {
        const fertilizerData = FertilizerData.find(
          (f) => f.id === fertilizer.fertilizerId,
        );
        if (!fertilizerData) continue;

        // 檢查肥料是否仍在有效期
        const elapsedSinceApply = now - fertilizer.appliedAt;
        if (elapsedSinceApply >= fertilizer.duration * 1000) {
          continue;
        }

        // 只有 'produce' 和 'hybrid' 類型的肥料會增加收穫量
        if (
          fertilizerData.fertilizerType === 'produce' ||
          fertilizerData.fertilizerType === 'hybrid'
        ) {
          totalProduceBoost *= fertilizerData.produceBoost;
        }
      }
      finalHarvestAmount = Math.ceil(harvestAmount * totalProduceBoost);
    }

    // 檢查背包空間
    if (this.inventoryService.isFull(crop.harvestAmount)) {
      alert('背包已滿');
      return;
    }

    // 添加物品到背包
    this.inventoryService.addItem(produceItem, crop.harvestAmount);

    // 清空農田格
    this.clearField(index);

    // 更新任務進度：記錄收集了什麼物品
    this.questManagerService.updateProgress(
      'collect',
      produceItem.id,
      crop.harvestAmount,
    );
  }

  /**
   * 施用肥料到農田格
   *
   * @param index - 農田格位置
   * @param fertilizer - 肥料物品
   * @returns { success: boolean; message: string }
   */
  applyFertilizer(
    index: number,
    fertilizer: Fertilizer,
  ): { success: boolean; message: string } {
    const tile = this.fields[index];

    if (tile.status !== 'planted' || !tile.crop) {
      return {
        success: false,
        message: '該格子沒有種植作物，無法施肥。',
      };
    }

    // 建立已施用肥料記錄
    const appliedFertilizer: AppliedFertilizer = {
      fertilizerId: fertilizer.id,
      appliedAt: this.gameDataService.time.getTime(),
      duration: fertilizer.duration,
    };

    tile.appliedFertilizers.push(appliedFertilizer);

    console.log(`[FarmService] 已施肥：${fertilizer.name} 於 農田格 ${index}`);
    return {
      success: true,
      message: `已施肥：${fertilizer.name}，持續 ${Math.round(fertilizer.duration / 60)} 分鐘`,
    };
  }

  /**
   * 清除枯萎的農作物
   * @param index - 農田格位置
   */
  clearWiltedCrop(index: number): void {
    if (this.fields[index].status === 'wilted') {
      this.clearField(index);
      console.log('[FarmService] 已清除枯萎的農作物');
    }
  }

  /**
   * 清空田地
   * @param index - 農田格位置
   */
  clearField(index: number): void {
    this.fields[index] = {
      status: 'empty',
      plantedAt: null,
      crop: null,
      appliedFertilizers: [],
    };
  }

  /**
   * 檢查農田升級條件
   * @returns { success: boolean; message: string }
   */
  tryUpgradeFarm(): { success: boolean; message: string } {
    if (this.gameDataService.money < this.upgradeCost) {
      const deficit = this.upgradeCost - this.gameDataService.money; // 赤字
      return {
        success: false,
        message: `金錢不足，需要 ${deficit} 金幣才能升級農田`,
      };
    }
    this.gameDataService.subMoney(this.upgradeCost);
    this.upgradeFarm();
    return { success: true, message: '農田升級成功' };
  }

  /**
   * 執行農田升級
   * 效果：
   * - 添加 3 個新農田格
   * - 增加升級成本
   * - 提升農場等級
   */
  upgradeFarm(): void {
    const newFields: Field[] = Array.from({ length: 3 }, () => ({
      status: 'empty',
      plantedAt: null,
      crop: null,
      appliedFertilizers: [],
    }));
    this.fields.push(...newFields);
    // 每升級一次，升級成本增加100
    this.upgradeCost = Math.floor(this.upgradeCost + this.farmLv * 100);
    this.farmLv += 1;
  }
}
