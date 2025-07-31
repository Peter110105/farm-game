import { Injectable } from '@angular/core';
import { Animal, AnimalStage } from '../../../entities/animal/animal.model';
import { InventoryService } from '../../../entities/inventory/service/inventory.service';
import { GameStateService } from '../../../core/game-state/game-state.service';
import { AnimalData } from '../../../entities/animal/animal.data';

@Injectable({
  providedIn: 'root'
})
export class RanchService {
  animals: Animal[] = [];
  constructor(private inventoryService: InventoryService, private gameStateService: GameStateService) {}

  buyAnimal(type: keyof typeof AnimalData): boolean{
    const data = AnimalData[type];
    if(!data || this.gameStateService.money < data.price){
      return false;
    }
    this.gameStateService.money -= data.price;
    const now = Date.now();
    const nextStage = now + data.growthStages[0] * 1000;
    const animal: Animal = {
      id: (this.animals.length + 1).toString(),
      type,
      name: data.name,
      icon: data.icon,
      stage: 'baby',
      bornAt: now,
      nextStageTime: nextStage,
      produceItem: data.produceItem,
      produceInterval: data.produceInterval,
      lastProduceTime: 0
    };
    this.animals.push(animal);
    this.save();
    return true;
  }

  updateAnimals(): void{
    const now = Date.now();
    this.animals.forEach(animal => {
      // 成長檢查
      if(animal.stage !== 'adult' && now >= animal.nextStageTime){
        if(animal.stage === 'baby'){
          animal.stage = 'teen';
          animal.nextStageTime = now + AnimalData[animal.type].growthStages[1] * 1000;
          animal.icon = this.getStageIcon(animal.type, animal.stage);
        }
        else if(animal.stage === 'teen'){
          animal.stage = 'adult';
          animal.nextStageTime = 0;
          animal.icon = this.getStageIcon(animal.type, animal.stage);
          animal.lastProduceTime = now;
        }
      }
      // 產出檢查
      if(animal.stage === 'adult' && animal.produceItem && animal.produceInterval){
        if(now - (animal.lastProduceTime || 0) >= animal.produceInterval * 1000){
          this.inventoryService.addItem({
            name: animal.produceItem,
            icon: this.getProduceIcon(animal.type),
            type: 'product',
            quantity: 1
          });
          animal.lastProduceTime = now;
        }
      }
    });
    this.save();
  }
  private getStageIcon(type: string, stage: AnimalStage): string {
    const map: Record<string, Record<AnimalStage, string>> = {
      chicken: { baby: '🐣', teen: '🐥', adult: '🐓' },
      cow: { baby: '🐄', teen: '🐂', adult: '🐂' },
      sheep: { baby: '🐑', teen: '🐏', adult: '🐏' },
    };
    return map[type]?.[stage] || '❓';
  }

  private getProduceIcon(type: string): string {
    const map: Record<string, string> = {
      chicken: '🥚',
      cow: '🥛',
      sheep: '🧶'
    };
    return map[type] || '📦';
  }
  private save(): void{
    localStorage.setItem('animals', JSON.stringify(this.animals));
  }
  load(): void{
    const animals = localStorage.getItem('animals');
    if(animals){
      this.animals = JSON.parse(animals);
    }
  }
}
