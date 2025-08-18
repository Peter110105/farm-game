import { Injectable } from '@angular/core';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { Item } from '../../../entities/item/item.model';
import { ItemData } from '../../../entities/item/item.data';
import { GameDataService } from '../../../core/game-data/game-data.service';
import { max } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private inventoryService: InventoryService, private gameDataService: GameDataService ) {}
  
  getItems(): Item[] {
    return ItemData;
  }

  buyItem(item: Item, quantity: number = 1): { success: boolean; message: string } {
    if(!this.inventoryService.isFull(quantity)){
      const money = this.gameDataService.money;
      const cost = item.price * quantity;
      if (money >= cost) {
        this.gameDataService.subMoney(cost);
        this.inventoryService.addItem(item, quantity);
        return { success: true, message: '購買成功' };
      }else{
        return { success: false, message: '金錢不足' };
      }
    }else{
      return { success: false, message: '背包空間不足' };
    }
  }

  sellItem(item: Item, quantity: number = 1): { success: boolean; message: string } {
    const sellPrice = item.sellPrice;
    if (sellPrice > 0) {
      this.gameDataService.addMoney(sellPrice * quantity);
      this.inventoryService.removeItem(item, quantity);
      return { success: true, message: '販賣成功' };
    }
    return { success: false, message: '無法販售此物品' };
  }

}
