import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { CropService } from '../../entities/crop/service/crop.service';
import { Crop } from '../../entities/crop/crop.model';
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
  selectedCrop!: Crop;
  constructor(private cropService: CropService, protected farmService: FarmService ) {}

  ngOnInit() {
    this.crops = this.cropService.getAllCrops();
    this.selectedCrop = this.crops[0];
  }

  onTileClick(index: number): void {
    const status = this.farmService.fields[index].status;
    if(status === 'empty'){
      if(!this.selectedCrop){
        return;
      }
      const result = this.farmService.tryPlant(index, this.selectedCrop);
      if(!result.success){
        alert(result.message);
    }
    }else if(status === 'grown'){
      this.farmService.harvest(index);
    }
    
  }

  getEmoji(status: string, crop: Crop | null): string {
    switch (status) {
      case 'empty': return '🟫';
      case 'planted': return '🌱';
      case 'grown': return  crop?.produceItem.icon || '🌾';
      default: return '❓';
    }
  }
}
