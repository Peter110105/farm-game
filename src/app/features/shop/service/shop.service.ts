import { Injectable } from '@angular/core';
import { ShopItem } from '../shop-item.model';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { Item } from '../../../entities/item/item.model';
import { ShopItemData } from '../shop-item.data';
import { GameDataService } from '../../../core/game-data/game-data.service';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private items: ShopItem[] = ShopItemData;

  constructor(private inventoryService: InventoryService, private gameDataService: GameDataService ) {}
  
  getItems(): ShopItem[] {
    return this.items;
  }

  buyItem(item: ShopItem, quantity: number = 1): { success: boolean; message: string } {
    if(!this.inventoryService.isFull(quantity)){
      const money = this.gameDataService.money;
      const cost = item.price * quantity;
      if (money >= cost) {
        this.gameDataService.subMoney(cost);
        this.inventoryService.addItem({ ...item, quantity });
        return { success: true, message: '購買成功' };
      }else{
        return { success: false, message: '金錢不足' };
      }
    }else{
      return { success: false, message: '背包空間不足' };
    }
  }

  sellItem(item: Item, quantity: number = 1): { success: boolean; message: string } {
    if(quantity > item.quantity){
      return {success: false, message: '數量不足'};
    }
    const sellPrice = this.items.find(i => i.name === item.name)?.sellPrice ?? 0;
    if (sellPrice > 0) {
      this.gameDataService.addMoney(sellPrice * quantity);
      this.inventoryService.removeItem(item, quantity);
      return { success: true, message: '販賣成功' };
    }
    return { success: false, message: '無法販售此物品' };
  }

}
