import { Injectable } from '@angular/core';
import { ShopItem } from '../shop-item.model';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { GameStateService } from '../../../core/game-state/game-state.service';
import { Item } from '../../../entities/item/item.model';
import { ShopItemData } from '../shop-item.data';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private items: ShopItem[] = ShopItemData;

  constructor(private inventory: InventoryService, private game: GameStateService) {}
  
  getItems(): ShopItem[] {
    return this.items;
  }

  buyItem(item: ShopItem, quantity: number = 1): boolean {
    if (this.game.money >= item.price) {
      item.quantity = quantity;
      this.game.money -= item.price * quantity;
      this.inventory.addItem(item);
      return true;
    }
    return false;
  }

  sellItem(item: Item, quantity: number = 1): boolean {
    if(quantity > item.quantity){
      return false;
    }
    const sellPrice = this.items.find(i => i.name === item.name)?.sellPrice ?? 0;
    if (sellPrice > 0) {
      this.game.money += sellPrice * quantity;
      this.inventory.removeItem(item, quantity);
      return true;
    }
    return false;
  }

}
