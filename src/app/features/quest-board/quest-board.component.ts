import { Component } from '@angular/core';
import { QuestManagerService } from '../../core/quest-manager/quest-manager.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule} from 'ng-zorro-antd/tabs';
import { NzDrawerModule} from 'ng-zorro-antd/drawer';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { ItemService } from '../../entities/item/service/item.service';

@Component({
  selector: 'app-quest-board',
  imports: [NzDrawerModule, NzTabsModule, NzCollapseModule, NzButtonModule, NzProgressModule],
  templateUrl: './quest-board.component.html',
  styleUrl: './quest-board.component.scss'
})
export class QuestBoardComponent {

  constructor(private questMangerService: QuestManagerService, public itemService: ItemService) { }
  
  visible = false;

  toggle(): void {
    this.visible = !this.visible;
  }
  // 取得進行中任務
  getActiveQuests() {
    return this.questMangerService.getActiveQuests();
  }
  // 取得已完成任務
  getCompletedQuests() {
    return this.questMangerService.getCompletedQuests();
  } 
  // 取得可接取任務
  getAvailableQuests() {
    return this.questMangerService.getAvailableQuests();
  }
  // 接取任務
  acceptQuest(questId: number): void {
    const result = this.questMangerService.acceptQuest(questId);
    if (!result.success) {
      alert(result.message);
      console.error(result.message);
    } else {
      console.log('任務接取成功:', questId);
    }
  }
  // 領取獎勵
  claimReward(questId: number): void {
    const result = this.questMangerService.claimReward(questId);
    if (!result.success) {
      alert(result.message);
      console.error(result.message);
    } else {
      console.log('獎勵領取成功:', questId);
    }
  }
   // 取得任務進度百分比
  getQuestProgress(target: number, current: number): number {
    return Math.round((current / target) * 100);
  }

  // 轉換任務目標類型為可讀文字
  getTargetTypeText(type: string): string {
    switch (type) {
      case 'plant':
        return '種植';
      case 'collect':
        return '收集';
      case 'deliver':
        return '交付';
      case 'buy':
        return '購買';
      case 'sell':
        return '銷售';
      case 'produce':
        return '生產';
      case 'wealth':
        return '財富';
      case 'progress':
        return '進度';
      default:
        return '未知';
    }
  }
}
