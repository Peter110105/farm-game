import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalData } from '../../entities/animal/animal.data';
import { RanchService } from './service/ranch.service';
import { Animal } from '../../entities/animal/animal.model';

/**
 * RanchComponent - 牧場 UI 元件
 *
 * 職責：
 * 1. 顯示可購買的動物列表
 * 2. 顯示已購買的動物
 * 3. 處理購買和升級操作
 */
@Component({
  selector: 'app-ranch-component',
  imports: [CommonModule],
  templateUrl: './ranch.component.html',
  styleUrl: './ranch.component.scss',
})
export class RanchComponent {
  canBuyAnimals: Animal[] = [];

  constructor(public ranchService: RanchService) {
    // 篩選出有購買成本的動物（即可直接購買的動物）
    this.canBuyAnimals = AnimalData.filter((animal) => animal.cost > 0);
  }

  /**
   * 取得已購買的動物列表
   */
  get animals() {
    return this.ranchService.animals;
  }

  /**
   * 購買動物
   * @param animal - 要購買的動物原型
   */
  buy(animal: Animal): void {
    if (!animal) {
      console.warn('未選擇任何動物');
      return;
    }
    const result = this.ranchService.trybuyAnimal(animal);
    if (!result.success) {
      alert(result.message);
      console.error(result.message);
    } else {
      console.log(`購買成功: ${animal.name}`);
    }
  }

  /**
   * 升級牧場
   */
  upgrade(): void {
    const result = this.ranchService.tryUpgradeRanch();
    if (!result.success) {
      alert(result.message);
      console.error(result.message);
      return;
    }
    console.log('牧場升級成功');
  }
}
