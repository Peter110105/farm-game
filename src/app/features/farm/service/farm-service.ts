import { Injectable } from '@angular/core';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { Crop } from '../../../entities/crop/crop.module';
import { Item } from '../../../entities/item/item.model';
import { Field } from '../../../entities/field/field-module';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
  private _fields: Field[] = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));
  
  constructor(private inventoryService: InventoryService) {}
  
  get fields(): Field[] {
    return this._fields;
  }
  set fields(value: Field[]) {
    this._fields = value;
  }
  initial(){
    this.fields = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));
  }
  // 種植
  plant(index: number, crop: Crop): void {
    if (this.fields[index].status === 'empty') {
      this.fields[index] = { status: 'planted', plantedAt: Date.now(), crop: crop };
    }
  }
  // 成長
  updateGrowth(): void {
    const now = Date.now();
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
      const success = this.inventoryService.addItem(item);
      if(!success){
        alert('背包已滿');
        return;
      }
      this.fields[index] = { status: 'empty', plantedAt: null, crop: null };
    }
  }

}
