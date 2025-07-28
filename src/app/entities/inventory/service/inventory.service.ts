import { Injectable } from '@angular/core';
import { Inventory } from '../inventory.model';
import { Item } from '../../item/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventory: Inventory = { items: [], capacity: 30 };
  private upgradeCost = 50;

  // 獲得背包
  getInventory(): Inventory {
    return this.inventory;
  }
  // 背包升級花費
  getUpgradeCost(): number {
    return this.upgradeCost;
  }
  // 獲得物品總數量
  getTotalQuantity(): number {
    return this.inventory.items.reduce((sum, item) => sum + item.quantity, 0);
  }
  // 背包容量
  getCapacity(): number {
    return this.inventory.capacity;
  }
  // 增加物品
  addItem(newItem: Item): boolean{
    const availableSpace = this.inventory.capacity - this.getTotalQuantity();
    if (availableSpace < newItem.quantity) {
      return false;
    }

    const existing = this.inventory.items.find(
      item => item.name === newItem.name && item.type === newItem.type
    );

    if (existing) {
      existing.quantity += newItem.quantity;
    } else {
      this.inventory.items.push({ ...newItem });
    }

    return true;
  }
  // 背包升級
  upgradeInventory(): void {
    this.inventory.capacity += 10;
    this.upgradeCost = Math.floor(this.upgradeCost * 1.5);
  }
  // 清空背包
  clear(): void{
    this.inventory.items = [];
    this.inventory.capacity = 20;
    this.upgradeCost = 50;
  }
}
