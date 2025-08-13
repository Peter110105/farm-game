import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from './service/inventory.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { GameDataService } from '../../core/game-data/game-data.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, NzDrawerModule, NzButtonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  visible = false;
  constructor(public inventoryService: InventoryService, public gameDataService: GameDataService) {}
  
  toggle(): void{
    this.visible = !this.visible;
  }

  upgrade(): void {
    const result = this.inventoryService.tryUpgradeInventory();
    if (!result.success) {
      alert(result.message);
    }
  }

}