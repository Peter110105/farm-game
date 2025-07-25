import { Injectable } from '@angular/core';
import { Crop } from '../../entities/crop/crop.module';


@Injectable({
  providedIn: 'root'
})
export class GameStateService {

  money = 100;
  crops = 0;
  time = new Date();
  field: FarmTile[] = Array.from({ length: 9 }, () => ({ status: 'empty', plantedAt: null, crop: null }));
  constructor() { 
    setInterval(() => this.updateGrowth(), 1000); 
  }
  
  plant(index: number, crop: Crop): void {
    if (this.field[index] && this.field[index].status === 'empty') {
      this.field[index] = { status: 'planted', plantedAt: Date.now(), crop: crop };
    }
  }
  harvest(index: number): void {
    if (this.field[index] && this.field[index].status === 'grown') {
      this.field[index] = { status: 'empty', plantedAt: null , crop: null };
      this.crops++;
    }
  }
  updateGrowth(): void {
    const now = Date.now();
    for (const tile of this.field) {
      if (tile.status === 'planted' && tile.plantedAt && tile.crop &&
         now - tile.plantedAt >= tile.crop?.growthTime * 1000) {
        tile.status = 'grown';
      }
    }
    this.time = new Date(this.time.getTime() + 1000 * 60); // 每秒 + 1 小時
  }
}
// export class field{
//     isOccupied: boolean = false;
//     cropType: string = '';
//     growthStage: number = 0;
//     plantingTime: Date | null = null;
// }

export interface FarmTile {
  status: 'empty' | 'planted' | 'grown';
  plantedAt: number | null;
  crop: Crop | null; // Optional property to hold the crop information
}