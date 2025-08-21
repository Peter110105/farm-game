import { Injectable } from '@angular/core';
import { GameDataService } from '../../../core/game-data/game-data.service';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { Crop } from '../../../entities/crop/crop.model';
import { Field } from '../../../entities/field/field-model';
import { QuestManagerService } from '../../../core/quest-manager/quest-manager.service';


@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private _fields: Field[] = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));

  constructor(
    private inventoryService: InventoryService, 
    private gameDataService: GameDataService,
    private questManagerService: QuestManagerService
  ) {}
  
  get fields(): Field[] {
    return this._fields;
  }
  set fields(value: Field[]) {
    this._fields = value;
  }
  initial(){
    this.fields = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));
  }
  // 檢查種植條件
  tryPlant(index: number, crop: Crop): { success: boolean; message: string }{
    const money = this.gameDataService.money;
    const cost = crop.seedItem.price;
    if (money >= cost) {
      this.gameDataService.subMoney(cost);
      this.plant(index, crop);
      return { success: true, message: `種植成功！` };
    }
    else{
      return { success: false, message: `金錢不足，需要 ${ cost - money} 金幣才能種植` };
    }
  }
  // 種植
  plant(index: number, crop: Crop): void {
    // 種植
    this.fields[index] = { status: 'planted', plantedAt: this.gameDataService.time.getTime(), crop: crop };
    // 更新任務進度
    this.questManagerService.updateProgress('plant', crop.seedItem.id, 1);
  }
  // 成長
  updateGrowth(): void {
    const now = this.gameDataService.time.getTime();
    for (const tile of this.fields) {   
      if (tile.status === 'planted' && tile.plantedAt && tile.crop &&
         now - tile.plantedAt >= tile.crop?.growthTime * 1000) {
        tile.status = 'grown';
      }
    }
  }
  // 收穫
  harvest(index: number): void {
    const tile = this.fields[index];
    if (tile.status === 'grown' && tile.crop) {
      const crop = tile.crop;
      // 檢查背包是否滿了
      if(this.inventoryService.isFull(crop.harvestAmount)){
        alert('背包已滿');
        return;
      }
      // 添加收穫物品到背包
      this.inventoryService.addItem(crop.produceItem, crop.harvestAmount);
      this.fields[index] = { status: 'empty', plantedAt: null, crop: null };
      // 更新任務進度
      this.questManagerService.updateProgress('collect', crop.produceItem.id, crop.harvestAmount);
    }
  }

}
