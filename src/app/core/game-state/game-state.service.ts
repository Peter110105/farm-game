import { Injectable } from '@angular/core';
import { Crop } from '../../entities/crop/crop.module';
import { InventoryService } from '../../entities/inventory/service/inventory.service';
import { Item } from '../../entities/item/item.model';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  money = 100;
  crops = 0;
  time = new Date();
  field: FarmTile[] = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));
  
  constructor(public inventoryService: InventoryService) { 
    setInterval(() => this.updateGrowth(), 1000); 
  }
  // 種植
  plant(index: number, crop: Crop): void {
    if (this.field[index].status === 'empty') {
      if (this.money < crop.cost) {
        alert('金錢不足');
        return;
      }
      this.money -= crop.cost;
      this.field[index] = { status: 'planted', plantedAt: Date.now(), crop: crop };
    }
  }
  // 成長
  updateGrowth(): void {
    const now = Date.now();
    for (const tile of this.field) {
      if (tile.status === 'planted' && tile.plantedAt && tile.crop &&
         now - tile.plantedAt >= tile.crop?.growthTime * 1000) {
        tile.status = 'grown';
      }
    }
    this.time = new Date(this.time.getTime() + 1000 * 60); // 每秒 + 1 小時
  }
  // 收穫
  harvest(index: number): void {
    const tile = this.field[index];
    if (tile.status === 'grown' && tile.crop) {
      const item: Item = {
        name: tile.crop.name,
        icon: tile.crop.icon,
        type: 'crop',
        quantity: tile.crop.harvestAmount
      };
      const success = this.inventoryService.addItem(item);
      if(!success){
        alert('背包已滿');
        return;
      }
      this.field[index] = { status: 'empty', plantedAt: null, crop: null };
    }
  }
  // 升級背包
  tryUpgradeInventory(): void {
    const cost = this.inventoryService.getUpgradeCost();
    if (this.money >= cost) {
      this.money -= cost;
      this.inventoryService.upgradeInventory();
    } else {
      alert('金錢不足，無法升級背包');
    }
  }
}


export interface FarmTile {
  status: 'empty' | 'planted' | 'grown'; // 狀態
  plantedAt: number | null; // 種植時間
  crop: Crop | null;  // 農作物
}