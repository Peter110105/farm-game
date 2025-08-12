import { Injectable } from '@angular/core';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { Crop } from '../../../entities/crop/crop.model';
import { Item } from '../../../entities/item/item.model';
import { Field } from '../../../entities/field/field-model';
import { GameDataService } from '../../../core/game-data/game-data.service';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private _fields: Field[] = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));

  constructor(
    private inventoryService: InventoryService, 
    private gameDataService: GameDataService
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
    if (money >= crop.cost) {
      this.gameDataService.subMoney(crop.cost);
      this.plant(index, crop);
      return { success: true, message: `種植成功！` };
    }
    else{
      return { success: false, message: `金錢不足，需要 ${ crop.cost - money} 金幣才能升級背包` };
    }
  }
  // 種植
  plant(index: number, crop: Crop): void {
    this.fields[index] = { status: 'planted', plantedAt: this.gameDataService.time.getTime(), crop: crop };
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
      const item: Item = {
        name: tile.crop.name,
        icon: tile.crop.icon,
        type: 'crop',
        quantity: tile.crop.harvestAmount
      };

      if(this.inventoryService.isFull(item.quantity)){
        alert('背包已滿');
        return;
      }
      this.inventoryService.addItem(item);
      this.fields[index] = { status: 'empty', plantedAt: null, crop: null };
    }
  }

}
