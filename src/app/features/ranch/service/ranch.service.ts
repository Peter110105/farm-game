import { Injectable } from '@angular/core';
import { Animal, AnimalStage } from '../../../entities/animal/animal.model';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { AnimalData } from '../../../entities/animal/animal.data';
import { GameDataService } from '../../../core/game-data/game-data.service';
import { QuestManagerService } from '../../../core/quest-manager/quest-manager.service';
import { ItemService } from '../../../entities/item/service/item.service';

/**
 * RanchService - 牧場業務邏輯服務
 * 職責：
 * 1. 管理牲畜列表和牧場狀態
 * 2. 計算牲畜成長和產出
 * 3. 處理購買邏輯
 * 4. 管理牧場升級
 */
@Injectable({
  providedIn: 'root',
})
export class RanchService {
  private _animals: Animal[] = [];
  private _ranchSize = 5; // 初始只能養5隻動物
  private _ranchLv = 1;
  private _upgradeCost = 250;

  constructor(
    private inventoryService: InventoryService,
    private gameDataService: GameDataService,
    private questManagerService: QuestManagerService,
    private itemService: ItemService,
  ) {}

  get animals(): Animal[] {
    return this._animals;
  }
  set animals(value: Animal[]) {
    this._animals = value;
  }
  get ranchSize(): number {
    return this._ranchSize;
  }
  set ranchSize(value: number) {
    this._ranchSize = value;
  }
  get ranchLv(): number {
    return this._ranchLv;
  }
  set ranchLv(value: number) {
    this._ranchLv = value;
  }
  get upgradeCost(): number {
    return this._upgradeCost;
  }
  set upgradeCost(value: number) {
    this._upgradeCost = value;
  }

  /**
   * 重置牧場為初始狀態
   */
  initial(): void {
    this.animals = [];
    this.ranchSize = 5;
    this.ranchLv = 1;
    this.upgradeCost = 250;
  }

  /**
   * 載入牧場狀態（用於遊戲讀檔）
   */
  load(animals: Animal[], ranchSize: number, ranchLv: number): void {
    this.animals = animals;
    this.ranchSize = ranchSize;
    this.ranchLv = ranchLv;
    this.upgradeCost = 250 + (this.ranchLv - 1) * 150; // 初始升級成本
  }

  /**
   * 檢查購買條件並嘗試購買動物
   *
   * 流程：
   * 1. 檢查牧場容量
   * 2. 檢查是否有足夠金錢
   * 3. 執行購買
   * @param animal - 要購買的動物原型（從 AnimalData 取得）
   * @returns { success: boolean; message: string }
   */
  trybuyAnimal(animal: Animal): { success: boolean; message: string } {
    // 檢查牧場是否有空間
    if (this.animals.length >= this.ranchSize) {
      return { success: false, message: '牧場已滿，無法購買更多動物' };
    }

    // 檢查金錢
    const money = this.gameDataService.money;
    if (money >= animal.cost) {
      this.gameDataService.subMoney(animal.cost);
      this.buyAnimal(animal);
      return { success: true, message: `購買成功！` };
    } else {
      const deficit = animal.cost - money;
      return {
        success: false,
        message: `金錢不足，需要 ${deficit} 金幣才能購買動物`,
      };
    }
  }

  /**
   * 執行購買動物
   * 邏輯：
   * 1. 複製動物物件並設置出生時間
   * 2. 添加到牧場
   * 3. 更新任務進度
   * @param animal - 要購買的動物原型
   */
  buyAnimal(animal: Animal): void {
    const now = this.gameDataService.time;

    // 複製動物物件並設置出生時間（重要：不要直接修改原型）
    const newAnimal: Animal = {
      ...animal,
      bornAt: now.getTime(),
      lastProduceTime: 0,
    };

    this.animals.push(newAnimal);

    // 更新任務進度
    this.questManagerService.updateProgress('buy', animal.id, 1);
  }

  /**
   * 更新動物狀態
   * 核心邏輯：
   * 1. 檢查幼體是否應成長
   * 2. 檢查成年動物是否應產出資源
   * 3. 將產出物品添加到背包
   * 4. 更新任務進度
   * 呼叫時機：遊戲循環中每秒執行一次
   */
  updateAnimals(): void {
    const now = this.gameDataService.time.getTime();

    for (let i = 0; i < this.animals.length; i++) {
      const animal = this.animals[i];

      // ===== 檢查成長 =====
      if (animal.stage === 'baby') {
        const elapsedTime = now - animal.bornAt;
        const growthTimeMs = animal.growthTime * 1000;

        if (elapsedTime >= growthTimeMs) {
          // 查找成年版本（通常 ID 相差 1）
          const adultVersion = AnimalData.find(
            (data) => data.id === animal.id + 1,
          );

          if (adultVersion) {
            // 複製成年版本並保留重要狀態
            this.animals[i] = {
              ...adultVersion,
              bornAt: animal.bornAt,
              lastProduceTime: now,
            };
          } else {
            console.warn(`[Warning] 無法找到動物 ID ${animal.id} 的成年版本`);
          }
        }
      }

      // ===== 檢查產出 =====
      if (
        animal.stage === 'adult' &&
        animal.produceItemId &&
        animal.produceInterval &&
        animal.lastProduceTime !== undefined
      ) {
        const elapsedSinceLastProduce = now - animal.lastProduceTime;
        const produceIntervalMs = animal.produceInterval * 1000;

        if (elapsedSinceLastProduce >= produceIntervalMs) {
          // 取得產出物品
          const produceItem = this.itemService.getItemById(
            animal.produceItemId,
          );

          if (!produceItem) {
            console.error(
              `[Error] 動物 ID ${animal.id} 無法找到產出物品 ID: ${animal.produceItemId}。` +
                `請檢查 animal.data.ts 中的 produceItemId 是否對應真實物品 ID。`,
            );
            continue;
          }

          // 檢查背包空間
          if (this.inventoryService.isFull(1)) {
            console.warn(
              `[Warning] 背包已滿，無法收集動物 ID ${animal.id} 的產出物品`,
            );
            continue;
          }

          // 添加物品到背包
          this.inventoryService.addItem(produceItem, 1);

          // 更新最後產出時間
          this.animals[i].lastProduceTime = now;

          // 更新任務進度
          this.questManagerService.updateProgress('collect', animal.produceItemId, 1);
        }
      }
    }
  }

  /**
   * 檢查牧場升級條件
   * @returns { success: boolean; message: string }
   */
  tryUpgradeRanch(): { success: boolean; message: string } {
    if (this.gameDataService.money < this.upgradeCost) {
      const deficit = this.upgradeCost - this.gameDataService.money;
      return {
        success: false,
        message: `金錢不足，需要 ${deficit} 金幣才能升級牧場`,
      };
    }
    this.gameDataService.subMoney(this.upgradeCost);
    this.upgradeRanch();
    return { success: true, message: '牧場升級成功' };
  }

  /**
   * 執行牧場升級
   * 效果：
   * - 增加牧場容量 (+2 隻動物)
   * - 增加升級成本
   * - 提升牧場等級
   */
  upgradeRanch(): void {
    this.ranchSize += 2;
    this.upgradeCost = Math.floor(this.upgradeCost + this.ranchLv * 150);
    this.ranchLv += 1;
  }
}
