import { Injectable } from '@angular/core';
import { ItemData } from '../item.data';
import { Item } from '../item.model';
import { Crop } from '../../crop/crop.model';
import { Animal } from '../../animal/animal.model';

/**
 * ItemService - 物品管理與查詢服務
 */
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // ============ 基礎查詢 ============

  /**
   * 取得所有物品
   */
  getItems(): Item[] {
    return ItemData;
  }

  /**
   * 根據 ID 查詢單個物品
   * @param id - 物品 ID
   * @returns 物品物件，不存在則返回 undefined
   */
  getItemById(id: number): Item | undefined {
    return ItemData.find((item) => item.id === id);
  }

  /**
   * 根據類型查詢物品群組
   * @param type - 物品類型 ('seed' | 'crop' | 'produce' | 'processed')
   * @returns 符合類型的所有物品
   */
  getItemsByType(type: string): Item[] {
    return ItemData.filter((item) => item.type === type);
  }

  // ============ 資料補全（Enrichment） ============
  /**
   * 為 Crop 補全完整物品資訊
   *
   * 用途：
   * - 業務邏輯層（Farm Service）需要存取種子或產出物品時
   * - UI 需要顯示完整農作物資訊時
   *
   * @param crop - 原始 Crop 物件（只含 ID）
   * @returns 補全後的 Crop 物件（包含完整 seedItem 和 produceItem）
   * @throws 當找不到對應物品時拋出錯誤
   */
  enrichCrop(crop: Crop): Crop & { seedItem: Item; produceItem: Item } {
    const seedItem = this.getItemById(crop.seedItemId);
    const produceItem = this.getItemById(crop.produceItemId);

    if (!seedItem) {
      throw new Error(
        `[資料不同步] Crop ID ${crop.id} 無法找到種子物品。` +
          `seedItemId=${crop.seedItemId}。` +
          `請檢查 crop.data.ts 中的 seedItemId 是否對應 item.data.ts 中的真實 ID。`,
      );
    }

    if (!produceItem) {
      throw new Error(
        `[資料不同步] Crop ID ${crop.id} 無法找到產出物品。` +
          `produceItemId=${crop.produceItemId}。` +
          `請檢查 crop.data.ts 中的 produceItemId 是否對應 item.data.ts 中的真實 ID。`,
      );
    }

    return {
      ...crop,
      seedItem,
      produceItem,
    };
  }

  /**
   * 為 Animal 補全完整物品資訊
   *
   * 用途：
   * - 業務邏輯層（Ranch Service）需要存取產出物品時
   * - UI 需要顯示完整動物資訊時
   *
   * @param animal - 原始 Animal 物件（只含 produceItemId）
   * @returns 補全後的 Animal 物件（包含完整 produceItem）
   * @throws 當找不到對應物品且 produceItemId 存在時拋出錯誤
   */
  enrichAnimal(
    animal: Animal,
  ): Omit<Animal, 'produceItemId'> & { produceItem?: Item } {
    const produceItem = animal.produceItemId
      ? this.getItemById(animal.produceItemId)
      : undefined;

    if (animal.produceItemId && !produceItem) {
      throw new Error(
        `[資料不同步] Animal ID ${animal.id} 無法找到產出物品。` +
          `produceItemId=${animal.produceItemId}。` +
          `請檢查 animal.data.ts 中的 produceItemId 是否對應 item.data.ts 中的真實 ID。`,
      );
    }

    return {
      ...animal,
      produceItem,
    };
  }

  // ============ 批次操作 ============

  /**
   * 批次補全多個 Crop 物件
   * @param crops - Crop 陣列
   * @returns 補全後的 Crop 陣列
   */
  enrichCrops(crops: Crop[]) {
    return crops.map((crop) => this.enrichCrop(crop));
  }

  /**
   * 批次補全多個 Animal 物件
   * @param animals - Animal 陣列
   * @returns 補全後的 Animal 陣列
   */
  enrichAnimals(animals: Animal[]) {
    return animals.map((animal) => this.enrichAnimal(animal));
  }
}
