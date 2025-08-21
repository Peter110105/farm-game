import { Injectable } from '@angular/core';
import { Quest } from '../../entities/quest/quest.model';
import { QuestData} from '../../entities/quest/quest.data';
import { InventoryService } from '../../entities/inventory/service/inventory.service';
import { GameDataService } from '../game-data/game-data.service';

@Injectable({
  providedIn: 'root'
})
export class QuestManagerService {
  private quests: Quest[] = QuestData;    // 預設任務數據
  private activeQuests: Quest[] = [];     // 已接取任務
  private completedQuests: Quest[] = [];  // 已完成任務
  private availableQuests: Quest[] = [];  // 可接取任務


  constructor(
    private inventoryService: InventoryService, 
    private gameDataService: GameDataService
  ) {
    // 初始化任務數據
    this.initializeQuests();
  }
  // === 核心管理功能 ===

  // 初始化任務系統
  initializeQuests(){
    this.quests = QuestData; // 載入預設任務數據
    this.activeQuests = []; // 清空已接取任務
    this.completedQuests = []; // 清空已完成任務
    this.availableQuests = []; // 清空可接取任務
    this.updateQuests(); // 更新可接取任務列表
  }           
  // 載入任務進度
  loadQuestProgress(activeQuests: Quest[], completedQuests: Quest[], availableQuests: Quest[]) {
    this.activeQuests = activeQuests || [];
    this.completedQuests = completedQuests || [];
    this.availableQuests = availableQuests || [];
  }                 
  
  // === 任務狀態管理 ===

  // 取得進行中任務
  getActiveQuests(): Quest[] {
    return this.activeQuests;
  }
  // 取得已完成任務
  getCompletedQuests(): Quest[] {
    return this.completedQuests;
  }          
  // 取得可接取任務
  getAvailableQuests(): Quest[] {
    return this.availableQuests;
  } 
  // 更新任務列表
  updateQuests(): void{
    this.availableQuests.push( ...this.quests.filter(q => 
      !this.availableQuests.some(avQuest => avQuest.id === q.id) &&
      !this.activeQuests.some(activeQuest => activeQuest.id === q.id) &&
      !this.completedQuests.some(completedQuest => completedQuest.id === q.id) &&
      this.checkPreconditions(q)
    ) );
  }      
  // 接取任務
  acceptQuest(questId: number): { success: boolean; message: string } {
    const quest = this.availableQuests.find(q => q.id === questId);
    if (!quest) {
      return { success: false, message: '任務不存在或任務已被接取。' };
    }
    // 建立一個新陣列，只包含不符合條件（ID 不相等）的任務
    this.availableQuests = this.availableQuests.filter(q => q.id !== questId);
    this.activeQuests.push(quest);
    return { success: true, message: '任務已接取。' };
  }       
  // 完成任務
  completeQuest(questId: number){
    const quest = this.activeQuests.find(q => q.id === questId);
    if (!quest) return;
    this.activeQuests = this.activeQuests.filter(q => q.id !== questId);
    this.completedQuests.push(quest);
  }     

  // 領取獎勵
  claimReward(questId: number):{ success: boolean; message: string } {
    const quest = this.activeQuests.find(q => q.id === questId);
    if (!quest || !quest.completed || quest.rewardClaimed) return { success: false, message: '任務不存在或獎勵已領取。' };
      // 1.發放物品
      if(quest.reward.items) {
        // 1.1 計算總物品數量
        const totalItems = quest.reward.items.reduce((acc, item) => {
          return acc + item.quantity;
        }, 0);
        // 1.2 檢查背包空間
        if(this.inventoryService.isFull(totalItems)) {
          console.warn('背包空間不足，無法發放獎勵。請先清理背包。');
          return { success: false, message: '背包空間不足，無法發放獎勵。請先清理背包。' };
        }
        // 1.3 發放每個物品
        quest.reward.items.forEach(item => {
          // this.inventoryService.addItem(item.itemId, item.quantity);
        });
      }
      // 2.發放金錢
      if(quest.reward.money) {
        this.gameDataService.addMoney(quest.reward.money);
      }
      // 3.判斷是否為可重複任務
      if(quest.isRepeatable) {
        // 如果是可重複任務，則將任務狀態重置為未完成
        quest.completed = false;
        quest.rewardClaimed = false; // 重置獎勵領取狀態
        this.activeQuests = this.activeQuests.filter(q => q.id !== questId); // 從進行中任務中移除
      }
      else {
        quest.rewardClaimed = true;
        this.completeQuest(questId); // 完成任務
      }

      return { success: true, message: '獎勵已領取。' };
  }

  // 取得任務進度百分比
  getProgress(questId: number): number {
    const quest = this.activeQuests.find(q => q.id === questId);
    if (!quest) return 0;

    // 計算總目標數量
    const totalTargets = quest.targets.reduce((acc, target) => acc + target.target, 0);
    if (totalTargets === 0) return 0; // 避免除以零

    // 計算已完成的目標數量
    const completedTargets = quest.targets.reduce((acc, target) => acc + target.current, 0);

    // 返回進度百分比
    return Math.round((completedTargets / totalTargets) * 100);
  }
  
  // === 進度更新 ===

  // 更新任務進度
  updateProgress(type: string, itemId?: number, amount: number = 1) {
    for (const quest of this.activeQuests) {
      for (const target of quest.targets) {
        if (target.type === type) {
          if (itemId && target.itemId !== itemId) continue; // 如果有指定 itemId，則只更新該物品
          target.current += amount;
          // 檢查目標是否完成
          if (this.checkObjectiveCompletion(quest)) {
            quest.completed = true; // 標記任務為完成
          }
        }
      }
    }
  } 
  // 檢查任務的前置條件是否符合
  private checkPreconditions(quest: Quest): boolean {
  // 沒有前置條件 → 可接
  if (!quest.preconditions) return true;

  // 判斷每個前置任務是否已完成
  if (quest.preconditions.requiredQuests) {
    for (const preQuestId of quest.preconditions.requiredQuests) {
      if (!this.completedQuests.some(q => q.id === preQuestId)) {
        return false; // 有前置任務未完成
      }
    }
  }
  // 判斷玩家等級是否符合
  // if (quest.preconditions.minLevel && this.gameDataService.getPlayerLevel() < quest.preconditions.minLevel) {
  //   return false; // 玩家等級不足
  // }
  // 判斷玩家是否擁有必要物品
  // if (quest.preconditions.requiredItems) {
  //   for (const item of quest.preconditions.requiredItems) {
  //     if (!this.inventoryService.hasItem(item.itemId, item.quantity)) {
  //       return false; // 缺少必要物品
  //     }
  //   }
  // }
  // 判斷遊戲時間是否符合
  // if (quest.preconditions.unlockDate) {
  //   const unlockDate = new Date(quest.preconditions.unlockDate);
  //   if (this.gameDataService.getGameTime() < unlockDate) {
  //     return false; // 遊戲時間未達成
  //   }
  // }
  return true; // 符合所有前置條件
}
  // 檢查目標完成
  checkObjectiveCompletion(quest: Quest): boolean {
    // 如果任務沒有目標，則視為未完成
    if (!quest || !quest.targets) return false;

    // 檢查所有目標是否已完成
    for (const target of quest.targets) {
      if( target.target > target.current ) {
        return false; // 只要有一個目標未完成，就返回 false
      }
    }
    return true; // 所有目標均已完成
  }  

}
