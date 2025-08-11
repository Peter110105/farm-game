import { Injectable } from '@angular/core';
import { Crop } from '../../entities/crop/crop.module';
import { InventoryService } from '../../entities/inventory/service/inventory.service';
import { Item } from '../../entities/item/item.model';
import { Field } from '../../entities/field/field-module';
import { GameState } from '../../entities/game-state/game-state-module';
import { FarmService } from '../../features/farm/service/farm-service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private readonly STORAGE_KEY = 'gameState';

  private _money = 100;
  private _time = new Date();

  constructor(private inventoryService: InventoryService, private farmService: FarmService) { 
    this.loadState();
    setInterval(() => {
      this.farmService.updateGrowth(); 
      this.saveState();
    }, 1000); 
  }
  // 載入遊戲階段
  private loadState(): void {
    const json = localStorage.getItem(this.STORAGE_KEY);
    if (json) {
      try{
        const state: GameState = JSON.parse(json);
        this.money = state.money;
        this.time = new Date(state.time);
        this.farmService.fields = state.fields;
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
      fields: this.farmService.fields,
      inventory: this.inventoryService.getInventory()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }
  // 重置遊戲
  resetGame(): void {
    this.money = 100;
    this.time = new Date();
    this.farmService.initial();
    this.inventoryService.clear();
    this.saveState();
  }
  // 升級背包
  tryUpgradeInventory(): void {
    const cost = this.inventoryService.getUpgradeCost();
    if (this.money >= cost) {
      this.subMoney(cost);
      this.inventoryService.upgradeInventory();
    } else {
      alert('金錢不足，無法升級背包');
    }
  }
  get money(): number {
    return this._money;
  }
  set money(value: number) {
    this._money = value;
  }
  addMoney(amount: number): void {
    this._money += amount;
  }
  subMoney(amount: number): void {
    this._money -= amount;
  }
  get time(): Date {
    return this._time;
  }
  set time(value: Date) {
    this._time = value;
  }

}