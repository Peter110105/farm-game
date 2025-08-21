import { Component } from '@angular/core';
import { QuestManagerService } from '../../core/quest-manager/quest-manager.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTabsModule} from 'ng-zorro-antd/tabs';
import { NzDrawerModule} from 'ng-zorro-antd/drawer';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-quest-board',
  imports: [NzDrawerModule, NzTabsModule, NzCollapseModule, NzButtonModule, NzProgressModule],
  templateUrl: './quest-board.component.html',
  styleUrl: './quest-board.component.scss'
})
export class QuestBoardComponent {

  constructor(private questMangerService: QuestManagerService) { }
  
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
  getQuestProgress(questId: number): number {
    return this.questMangerService.getProgress(questId);
  }
}
