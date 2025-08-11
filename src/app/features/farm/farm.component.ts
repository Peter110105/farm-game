import { Component, OnInit } from '@angular/core';
import { GameStateService } from '../../core/game-state/game-state.service';
import { CommonModule, DatePipe } from '@angular/common';
import { CropService } from '../../entities/crop/service/crop.service';
import { Crop } from '../../entities/crop/crop.module';
import { FormsModule } from '@angular/forms';
import { InventoryComponent } from '../../entities/inventory/inventory.component';
import { FarmService } from './service/farm-service';


@Component({
  selector: 'app-farm-plot',
  imports: [CommonModule, FormsModule, InventoryComponent],
  standalone: true,
  providers: [CropService],
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css']
})
export class FarmComponent implements OnInit {
  crops: Crop[] = [];
  selectedCropName: string = '';
  constructor(private gameService: GameStateService, private cropService: CropService, protected farmService: FarmService ) {}

  ngOnInit() {
    this.crops = this.cropService.getAllCrops();
    this.selectedCropName = this.crops[0].name;
  }

  onTileClick(index: number): void {
    const tile = this.farmService.fields[index];
    if (tile.status === 'empty') {
      const crop = this.cropService.getCropByName(this.selectedCropName);
      if(!crop){
        return;
      }

      if(this.gameService.money < crop.cost){
        alert('錢不夠，無法種植！');
        return;
      }
      this.farmService.plant(index, crop);
      this.gameService.subMoney(crop.cost);
      
    } else if (tile.status === 'grown') {
      this.farmService.harvest(index);
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
