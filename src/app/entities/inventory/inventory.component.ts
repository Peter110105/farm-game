import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryService } from './service/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  isOpen = false;
  constructor(public inventoryService: InventoryService) {}
  
  toggle(): void{
    this.isOpen = !this.isOpen;
  }

  upgrade(): void {
    const result = this.inventoryService.tryUpgradeInventory();
    if (!result.success) {
      alert(result.message);
    }
  }

}