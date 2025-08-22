import { Injectable } from '@angular/core';
import { Animal, AnimalStage } from '../../../entities/animal/animal.model';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { AnimalData } from '../../../entities/animal/animal.data';
import { GameDataService } from '../../../core/game-data/game-data.service';
import { QuestManagerService } from '../../../core/quest-manager/quest-manager.service';

@Injectable({
  providedIn: 'root'
})
export class RanchService {
  private _animals: Animal[] = [];
  private _ranchSize = 5; // 初始只能養5隻動物 
  private _ranchLv = 1;
  private _upgradeCost = 250;

  constructor(
    private inventoryService: InventoryService, 
    private gameDataService: GameDataService,
    private questManagerService: QuestManagerService,
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
  get ranchLv(): number {
    return this._ranchLv;
  }
  set ranchLv(value: number) {
    this._ranchLv = value;
  }
  get upgradeCost(): number {
    return this._upgradeCost;
  }
  set upgradeCost(value: number) {
    this._upgradeCost = value;
  }
  // 重製牧場
  initial(): void {
    this.animals = [];
    this.ranchSize = 5;
    this.ranchLv = 1;
    this.upgradeCost = 250;
  }

  load(animals: Animal[], ranchSize: number, ranchLv: number): void {
    this.animals = animals;
    this.ranchSize = ranchSize;
    this.ranchLv = ranchLv;
    this.upgradeCost = 250 + (this.ranchLv - 1) * 150; // 初始升級成本
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
    // 更新任務進度
    this.questManagerService.updateProgress('buy', animal.id, 1);
  }
  // 更新動物狀態
  updateAnimals(): void{
    const now = this.gameDataService.time.getTime();
    for(let i = 0; i < this.animals.length; i++){
      let animal = this.animals[i];
      // 成長檢查
      if(animal.stage === 'baby' && (now - animal.bornAt) >= animal.growthTime * 1000){
        this.animals[i]=  AnimalData.find(data => data.id === (animal.id+1)) ?? animal;
        this.animals[i].lastProduceTime = now;
      }
      // 產出檢查
      if(animal.stage === 'adult' && animal.produceInterval && animal.lastProduceTime 
        && (now - animal.lastProduceTime) >= animal.produceInterval * 1000){
        if(animal.produceItem){
          if(this.inventoryService.isFull(1)){
            return;
          }
          animal.lastProduceTime = now;
          this.inventoryService.addItem(animal.produceItem, 1);
          // 更新任務進度
          this.questManagerService.updateProgress('collect', animal.produceItem.id, 1);
        }
        else{
          console.log("warn:動物無產出 ID: ", animal.id);
        }
      }
    }
  }

    // 檢查升級條件
  tryUpgradeRanch():{ success: boolean; message: string } {
    if (this.gameDataService.money < this.upgradeCost) {
      return { success: false, message: `金錢不足，需要 ${this.upgradeCost - this.gameDataService.money} 金幣才能升級牧場` };
    }
    this.gameDataService.subMoney(this.upgradeCost);
    this.upgradeRanch();
    return { success: true, message: '牧場升級成功' };
  }
  // 牧場升級
  upgradeRanch(): void {
    this.ranchSize += 2; // 每次升級增加2個牧場容量
    // 每升級一次，升級成本增加150
    this.upgradeCost = Math.floor(this.upgradeCost + this.ranchLv * 150);
    this.ranchLv += 1;
  }

}
