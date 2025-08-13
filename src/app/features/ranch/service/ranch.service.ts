import { Injectable } from '@angular/core';
import { Animal, AnimalStage } from '../../../entities/animal/animal.model';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { AnimalData } from '../../../entities/animal/animal.data';
import { GameDataService } from '../../../core/game-data/game-data.service';

@Injectable({
  providedIn: 'root'
})
export class RanchService {
  private _animals: Animal[] = [];
  private _ranchSize = 5; // 初始只能養5隻動物 

  constructor(
    private inventoryService: InventoryService, 
    private gameDataService: GameDataService
  ) {}

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
  
  // 重製牧場
  initial(): void {
    this.animals = [];
    this.ranchSize = 5;
  }

  load(animals: Animal[], ranchSize: number): void {
    this.animals = animals;
    this.ranchSize = ranchSize;
  }

  trybuyAnimal(animal: Animal): { success: boolean; message: string }{
    if(this.animals.length < this.ranchSize){
      const money = this.gameDataService.money;
      if(money >= animal.cost){
        this.gameDataService.subMoney(animal.cost);
        this.buyAnimal(animal);
        return { success: true, message: `購買成功！` };
      }
      else{
        return { success: false, message: `金錢不足，需要 ${ animal.cost - money} 金幣才能購買動物` };
      }
    }else{
      return { success: false, message: '牧場已滿' }
    }
  }
  buyAnimal(animal: Animal): void{
    const now = this.gameDataService.time;
    animal.bornAt = now.getTime();
    this.animals.push(animal);

  }

  updateAnimals(): void{
    const now = this.gameDataService.time.getTime();
    for(let i = 0; i < this.animals.length; i++){
      let animal = this.animals[i];
      // 成長檢查
      if(animal.stage === 'baby' && (now - animal.bornAt) >= animal.growthTime * 1000){
        this.animals[i]=  AnimalData.find(data => data.id === (parseInt(animal.id)+1).toString()) ?? animal;
        this.animals[i].lastProduceTime = now;
      }
      // 產出檢查
      console.log(animal.stage === 'adult' && animal.produceInterval && animal.lastProduceTime 
        && ((now - animal.lastProduceTime) >= animal.produceInterval * 1000));
      if(animal.stage === 'adult' && animal.produceInterval && animal.lastProduceTime 
        && (now - animal.lastProduceTime) >= animal.produceInterval * 1000){
        if(animal.produceItem){
          if(this.inventoryService.isFull(animal.produceItem.quantity)){
            return;
          }
          animal.lastProduceTime = now;
          this.inventoryService.addItem(animal.produceItem);
        }
        else{
          console.log("warn:動物無產出 ID: ", animal.id);
        }
      }
    }
  }

}
