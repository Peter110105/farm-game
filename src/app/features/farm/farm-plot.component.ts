import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../core/game-state/game-state.service';
import { CommonModule, DatePipe } from '@angular/common';
import { CropService } from '../../entities/crop/service/crop.service';
import { Crop } from '../../entities/crop/crop.module';
import { FormsModule } from '@angular/forms';
import { InventoryComponent } from '../../entities/inventory/inventory.component';


@Component({
  selector: 'app-farm-plot',
  imports: [CommonModule, DatePipe, FormsModule, InventoryComponent],
  standalone: true,
  providers: [CropService],
  templateUrl: './farm-plot.component.html',
  styleUrls: ['./farm-plot.component.css']
})
export class FarmPlotComponent implements OnInit {
  crops: Crop[] = [];
  selectedCropName: string = '';
  constructor(public game: GameStateService, private cropService: CropService) {}

  ngOnInit() {
    this.crops = this.cropService.getAllCrops();
    this.selectedCropName = this.crops[0].name;
  }

  onTileClick(index: number): void {
    const tile = this.game.field[index];
    if (tile.status === 'empty') {
      const crop = this.cropService.getCropByName(this.selectedCropName);
      if(!crop){
        return;
      }

      if(this.game.money < crop.cost){
        alert('錢不夠，無法種植！');
        return;
      }
      this.game.plant(index, crop);
      
    } else if (tile.status === 'grown') {
      this.game.harvest(index);
    }
  }

  getEmoji(status: string, crop: Crop | null): string {
    switch (status) {
      case 'empty': return '🟫';
      case 'planted': return '🌱';
      case 'grown': return  crop?.icon || '🌾';
      default: return '❓';
    }
  }
}
