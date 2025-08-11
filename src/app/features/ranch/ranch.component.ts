import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../entities/animal/animal.model';
import { AnimalData } from '../../entities/animal/animal.data';
import { RanchService } from './service/ranch.service'; 
import { GameStateService } from '../../core/game-state/game-state.service';

@Component({
  selector: 'app-ranch-component',
  imports: [CommonModule],
  templateUrl: './ranch.component.html',
  styleUrl: './ranch.component.scss'
})
export class RanchComponent{

  constructor(public ranchService: RanchService, private gameStateService: GameStateService){}

  buy(id: string): void{
    const data =  AnimalData.find(data => data.id === id);
    if(!data){
      alert('無此動物');
      return;
    }
    if(data.cost > this.gameStateService.money){
      alert('錢不夠');
      return;
    }
    if(this.ranchService.buyAnimal(data, this.gameStateService.time)){
      this.gameStateService.subMoney(data.cost);
    }else{
      alert('動物已滿，請擴大牧場')
    }
  }
}
