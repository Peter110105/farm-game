import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../entities/animal/animal.model';
import { RanchService } from './service/ranch.service';

@Component({
  selector: 'app-ranch-component',
  imports: [CommonModule],
  templateUrl: './ranch.component.html',
  styleUrl: './ranch.component.scss'
})
export class RanchComponent implements OnInit{
  animals: Animal[] = [];

  constructor(public ranchService: RanchService){}

  ngOnInit(): void {
      this.ranchService.load();
      this.animals = this.ranchService.animals;
      // setInterval(() => {
        this.ranchService.updateAnimals();
      // }, 1000);
  }
  buy(type: 'chicken' | 'cow' | 'sheep'): void{
    if (!this.ranchService.buyAnimal(type)) {
      alert('金錢不足');
    }
  }
}
