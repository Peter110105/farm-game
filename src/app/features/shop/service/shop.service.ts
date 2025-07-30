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

  buyItem(item: ShopItem): boolean {
    if (this.game.money >= item.price) {
      this.game.money -= item.price;
      this.inventory.addItem(item);
      return true;
    }
    return false;
  }

  sellItem(item: Item): boolean {
    const sellPrice = this.items.find(i => i.name === item.name)?.sellPrice ?? 0;
    if (sellPrice > 0) {
      this.game.money += sellPrice;
      this.inventory.removeItem(item, 1);
      return true;
    }
    return false;
  }

}
