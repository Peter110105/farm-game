import { Injectable } from '@angular/core';
import { CropData } from '../crop.data';
import { DetailedCrop } from '../crop.model';
import { ItemService } from '../../item/service/item.service';

/**
 * CropService - 農作物業務邏輯服務
 */
@Injectable({
  providedIn: 'root',
})
export class CropService {
  private crops = CropData;

  constructor(private itemService: ItemService) {}

  /**
   * 取得所有農作物
   * 返回的是完整的 Crop 物件，包含 Item 物件
   * @returns 未補全的 Crop 陣列
   */
  getAllCrops(): DetailedCrop[] {
    return this.itemService.enrichCrops(this.crops);
  }

  /**
   * 取得包含完整物品資訊的農作物
   *
   * 用於需要存取種子和產出物品詳細資訊的業務邏輯
   * 例如：計算成本、顯示收穫成果等
   *
   * @param cropId - 農作物 ID
   * @returns 補全後的 Crop 物件（包含 seedItem 和 produceItem）
   * @throws 當農作物或物品不存在時拋出錯誤
   *
   * 使用範例：
   * ```typescript
   * const enrichedCrop = this.cropService.getCropEnriched(0);
   * console.log(enrichedCrop.seedItem.price);  // 種子價格
   * ```
   */
  getCropEnriched(cropId: number) {
    const crop = this.crops.find((c) => c.id === cropId);
    if (!crop) {
      throw new Error(`Crop with id ${cropId} not found in CropData`);
    }
    return this.itemService.enrichCrop(crop);
  }

  /**
   * 根據種子名稱查詢農作物
   *
   * 用於 UI 層根據用戶選擇查找對應作物
   *
   * @param name - 種子物品的名稱
   * @returns 補全後的 Crop 物件，或 undefined
   *
   * 使用範例：
   * ```typescript
   * const crop = this.cropService.getCropByName('小麥種子');
   * ```
   */
  getCropByName(name: string) {
    const crop = this.crops.find((c) => {
      const seedItem = this.itemService.getItemById(c.seedItemId);
      return seedItem?.name === name;
    });

    if (!crop) return undefined;
    return this.itemService.enrichCrop(crop);
  }

  /**
   * 根據種子物品 ID 查詢農作物
   *
   * @param seedItemId - 種子物品的 ID
   * @returns 補全後的 Crop 物件，或 undefined
   */
  getCropBySeedId(seedItemId: number) {
    const crop = this.crops.find((c) => c.seedItemId === seedItemId);
    if (!crop) return undefined;
    return this.itemService.enrichCrop(crop);
  }

  /**
   * 根據產出物品 ID 查詢農作物
   *
   * 用於從收穫的物品反向查詢是什麼農作物產出的
   *
   * @param produceItemId - 產出物品的 ID
   * @returns 補全後的 Crop 物件，或 undefined
   */
  getCropByProduceId(produceItemId: number) {
    const crop = this.crops.find((c) => c.produceItemId === produceItemId);
    if (!crop) return undefined;
    return this.itemService.enrichCrop(crop);
  }
}
