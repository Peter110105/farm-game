import { Injectable } from '@angular/core';
import { CropData } from '../crop.data';
import { Crop } from '../crop.model';

@Injectable({
  providedIn: 'root'
})
export class CropService {
  private crops = CropData;
  
  getAllCrops(): Crop[] {
    return this.crops;
  }
  getCropByName(name: string): Crop | undefined {
    return this.crops.find(crop => crop.name === name);
  }

}
