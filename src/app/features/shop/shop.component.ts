import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopItem } from './shop-item.model';
import { ShopService } from './service/shop.service';
import { InventoryService } from '../../entities/inventory/service/inventory.service';
import { Item } from '../../entities/item/item.model';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { GameDataService } from '../../core/game-data/game-data.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule, FormsModule, NzTabsModule, NzModalModule, NzInputNumberModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  items: ShopItem[] = [];
  canBuyItems: ShopItem[] = [];
  isVisible = false;
  selectedItem: Item | ShopItem | null = null;
  actionType: 'buy' | 'sell' = 'buy';
  quantity = 1;
  modalTitle = '';


  constructor(
    public shop: ShopService, 
    public inventory: InventoryService,
    public gameDataService: GameDataService,
  ){}

  ngOnInit(): void {
    this.items = this.shop.getItems();
    this.canBuyItems = this.items.filter(item => item.price > 0);
  }
  
  openItemModal(item: Item | ShopItem, action: 'buy' | 'sell'): void {
    this.selectedItem = item;
    this.actionType = action;
    this.quantity = 1;
    this.modalTitle = action === 'buy' ? '購買' : '販賣';
    this.isVisible = true;
  }
  confirmAction(): void {
    if(!this.selectedItem) return;
    if (this.actionType === 'buy') {
      this.buy(this.selectedItem as ShopItem);
    } else {
      this.sell(this.selectedItem as Item);
    }
    this.isVisible = false;
  }
  buy(item: ShopItem): void {
    const result = this.shop.buyItem(item, this.quantity);
    if (!result.success) {
      alert(result.message);
    }
  }

  sell(item: Item): void {
    const result = this.shop.sellItem(item, this.quantity);
    if(!result.success){
      alert(result.message);
    }
  }

  get selectedPrice(): number | undefined {
    return (this.selectedItem as any)?.price;
  }

  get selectedSellPrice(): number | undefined {
    return (this.selectedItem as any)?.sellPrice;
  }


}
