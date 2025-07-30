import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopItem } from './shop-item.model';
import { ShopService } from './service/shop.service';
import { GameStateService } from '../../core/game-state/game-state.service';
import { InventoryService } from '../../entities/inventory/service/inventory.service';
import { Item } from '../../entities/item/item.model';

@Component({
  selector: 'app-shop',
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  items: ShopItem[] = [];

  constructor(public shop: ShopService, public game: GameStateService, public inventory: InventoryService){}

  ngOnInit(): void {
    this.items = this.shop.getItems();
  }
  
  buy(item: ShopItem): void {
    if (!this.shop.buyItem(item)) {
      alert('購買失敗，可能金錢不足或背包滿了');
    }
  }

  sell(item: Item): void {
    if (!this.shop.sellItem(item)) {
      alert('無法販售此物品');
    }
  }
}
