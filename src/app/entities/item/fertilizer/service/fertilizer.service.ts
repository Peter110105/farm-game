import { Injectable } from '@angular/core';
import { Fertilizer } from '../fertilizer.model';
import { FertilizerData } from '../fertilizer.data';
import { InventoryService } from '../../../inventory/service/inventory.service';

/** 背包中的肥料資訊（型錄資料 + 實際持有數量） */
export interface FertilizerItem extends Fertilizer {
  quantity: number;
}

/**
 * FertilizerService - 肥料查詢與消耗服務
 */
@Injectable({
  providedIn: 'root',
})
export class FertilizerService {
  constructor(private inventoryService: InventoryService) {}

  /**
   * 取得背包中「實際持有」的肥料清單（quantity > 0）
   * 用途：UI 顯示可施用的肥料選項
   */
  getFertilizersInInventory(): FertilizerItem[] {
    return FertilizerData.map((fertilizer) => {
      const quantity = this.inventoryService.getItemQuantity(fertilizer);
      return quantity > 0 ? { ...fertilizer, quantity } : null;
    }).filter((f): f is FertilizerItem => f !== null);
  }

  /**
   * 嘗試使用（消耗）一個肥料
   *
   * @param fertilizerId - 要使用的肥料 ID
   * @returns 成功時附上肥料資料，供呼叫端套用效果到田地
   */
  tryUseFertilizer(fertilizerId: number): {
    success: boolean;
    message: string;
    fertilizer?: Fertilizer;
  } {
    const fertilizer = FertilizerData.find((f) => f.id === fertilizerId);
    if (!fertilizer) {
      return { success: false, message: '找不到此肥料資料' };
    }

    const quantity = this.inventoryService.getItemQuantity(fertilizer);
    if (quantity <= 0) {
      return { success: false, message: `背包中沒有 ${fertilizer.name}` };
    }

    const removed = this.inventoryService.removeItem(fertilizer, 1);
    if (!removed) {
      return { success: false, message: '扣除肥料失敗，請稍後再試' };
    }

    return { success: true, message: `使用了 ${fertilizer.name}`, fertilizer };
  }
}
