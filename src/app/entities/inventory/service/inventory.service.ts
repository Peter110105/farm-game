import { Injectable } from '@angular/core';
import { Inventory } from '../inventory.model';
import { Item } from '../../item/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventory: Inventory = { items: [], capacity: 30 };
  private upgradeCost = 50;

  setInventory(inventory:Inventory): void{
    this.inventory = inventory;
  }
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
  // 移除物品
  removeItem(item: Item, quantity: number): boolean{
    const index = this.inventory.items.findIndex(
      i => i.name === item.name && i.type === item.type
    );
    if (index === -1) {
      return false;
    }
    const inventoryItem = this.inventory.items[index];
    // 如果移除數量大於或等於物品庫存，則直接移除該物品
    if (inventoryItem.quantity <= quantity) {
      this.inventory.items.splice(index, 1);
    } else {
      // 否則，只減少物品數量
      inventoryItem.quantity -= quantity;
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
