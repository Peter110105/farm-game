import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalData } from '../../entities/animal/animal.data';
import { RanchService } from './service/ranch.service'; 
import { Animal } from '../../entities/animal/animal.model';


@Component({
  selector: 'app-ranch-component',
  imports: [CommonModule],
  templateUrl: './ranch.component.html',
  styleUrl: './ranch.component.scss'
})
export class RanchComponent{

  canBuyAnimals: Animal[] = [];

  constructor(public ranchService: RanchService){
    this.canBuyAnimals = AnimalData.filter(animal => animal.cost > 0);
  }

  get animals(){
    return this.ranchService.animals;
  }

  buy(animal: Animal): void{
    if(!animal){
      return;
    }
    const result = this.ranchService.trybuyAnimal(animal);
    if(!result.success){
      alert(result.message);
    }
  }

}
