import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../core/game-state/game-state.service';
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
  constructor(public service: InventoryService, private game: GameStateService) {}
  
  toggle(): void{
    this.isOpen = !this.isOpen;
  }

  upgrade(): void {
    this.game.tryUpgradeInventory();
  }

}