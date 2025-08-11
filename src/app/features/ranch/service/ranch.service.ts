import { Injectable } from '@angular/core';
import { Animal, AnimalStage } from '../../../entities/animal/animal.model';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { GameStateService } from '../../../core/game-state/game-state.service';
import { AnimalData } from '../../../entities/animal/animal.data';

@Injectable({
  providedIn: 'root'
})
export class RanchService {
  private _animals: Animal[] = [];
  private _ranchSize = 5; // 初始只能養5隻動物
  constructor(private inventoryService: InventoryService) {}

  get animals(): Animal[] {
    return this._animals;
  }
  set animals(value: Animal[]) {
    this._animals = value;
  }
  get ranchSize(): number {
    return this._ranchSize;
  }
  set ranchSize(value: number) {
    this._ranchSize = value;
  }
  
  buyAnimal(animal: Animal, now: Date): boolean{
    if(this.animals.length >= this.ranchSize){
      return false;
    }
    animal.bornAt = now.getTime();
    this.animals.push(animal);
    return true;
  }

  updateAnimals(date: Date): void{
    this.animals.forEach(animal => {
      // 成長檢查
      if(animal.stage === 'baby' && (date.getTime() - animal.bornAt) >= animal.growthTime * 1000){
        animal = AnimalData.find(data => data.id === (animal.id+1)) ?? animal;
        animal.lastProduceTime = date.getTime();
      }
      // 產出檢查
      if(animal.stage === 'adult' && animal.produceInterval && animal.lastProduceTime 
        && (date.getTime() - animal.lastProduceTime) >= animal.produceInterval * 1000){
        animal.lastProduceTime = date.getTime();
        if(animal.produceItem){
          this.inventoryService.addItem(animal.produceItem);
        }
        else{
          console.log("warn:動物無產出 ID: ", animal.id);
        }
      }
    });
  }
}
