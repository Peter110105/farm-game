import { Injectable } from '@angular/core';
import { Crop } from '../../entities/crop/crop.module';
import { InventoryService } from '../../entities/inventory/service/inventory.service';
import { Item } from '../../entities/item/item.model';
import { FarmPlot } from '../../entities/farm-plot/farm-plot-module';
import { GameState } from '../../entities/game-state/game-state-module';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private readonly STORAGE_KEY = 'gameState';

  money = 100;
  time = new Date();
  field: FarmPlot[] = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));
  
  constructor(public inventoryService: InventoryService) { 
    this.loadState();
    setInterval(() => {this.updateGrowth(); this.saveState();}, 1000); 
  }
  // 載入遊戲階段
  private loadState(): void {
    const json = localStorage.getItem(this.STORAGE_KEY);
    if (json) {
      try{
        const state: GameState = JSON.parse(json);
        this.money = state.money;
        this.time = new Date(state.time);
        this.field = state.field;
        this.inventoryService.setInventory(state.inventory);
      }catch (e){
        console.error('無遊戲狀態讀取失敗，初始化新遊戲', e);
      }
    }
  }
  // 保存遊戲階段
  private saveState(): void {
    const state: GameState = {
      money: this.money,
      time: this.time,
      field: this.field,
      inventory: this.inventoryService.getInventory()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
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
  // 重置遊戲
  resetGame(): void {
    this.money = 100;
    this.time = new Date();
    this.field = Array.from({ length: 9 }, () => ({
      status: 'empty',
      plantedAt: null,
      crop: null
    }));
    this.inventoryService.clear();
    this.saveState();
  }
}