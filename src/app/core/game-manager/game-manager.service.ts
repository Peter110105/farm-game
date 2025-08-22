import { Injectable } from '@angular/core';
import { GameDataService } from '../game-data/game-data.service';
import { GameLoopService } from '../game-loop/game-loop.service';
import { SaveLoadService } from '../save-load/save-load.service';
import { QuestManagerService } from '../quest-manager/quest-manager.service';
import { InventoryService } from '../../entities/inventory/service/inventory.service';
import { FarmService } from '../../features/farm/service/farm-service';
import { RanchService } from '../../features/ranch/service/ranch.service';
import { GameState } from '../../entities/game-state/game-state-model';


@Injectable({
  providedIn: 'root'
})
export class GameManagerService {
  
  constructor(
    private gameDataService: GameDataService, 
    private gameLoopService: GameLoopService, 
    private saveLoadService: SaveLoadService,
    private questManagerService: QuestManagerService,
    private farmService: FarmService,
    private inventoryService: InventoryService,
    private ranchService: RanchService
  ) {
    }
    
    // 初始化遊戲
    initialGame(){
      // 1.先載入遊戲狀態
      this.loadGame();

      // 2. 註冊更新回調
      this.registerCallbacks();
    
      // 3. 啟動遊戲循環
      this.gameLoopService.startGameLoop(1000);
    
      console.log('遊戲初始化完成'); 
    }

    private registerCallbacks(){
      // 統一註冊所有需要定期更新的服務
      this.gameLoopService.registerUpdateCallback(() => {
        this.farmService.updateGrowth();
        this.ranchService.updateAnimals();
        this.questManagerService.updateQuests();
      });
     // 註冊自動保存
      this.gameLoopService.registerSaveCallback(() => {
        this.saveGame();
      });

    }

    // 載入遊戲狀態
    private loadGame(){
      const savedState = this.saveLoadService.load();
      if(savedState){
        try{
          this.gameDataService.money = savedState.money;
          this.gameDataService.time = new Date(savedState.time);
          this.farmService.setFarm(savedState.fields, savedState.farmLv);
          this.inventoryService.setInventory(savedState.inventory);
          this.ranchService.load(savedState.animals, savedState.ranchSize, savedState.ranchLv);
          this.questManagerService.loadQuestProgress(savedState.activeQuests, savedState.completedQuests, savedState.availableQuests);
        }
        catch (error){
          console.error('載入遊戲失敗:', error);
        }
      } else {
        console.log('沒有保存的遊戲，開始新遊戲');
        this.resetGame();
      }
    }

    // 保存遊戲狀態
    saveGame(): void{
      const state: GameState = {
        money: this.gameDataService.money,
        time: this.gameDataService.time,
        fields: this.farmService.fields,
        farmLv: this.farmService.farmLv,
        inventory: this.inventoryService.getInventory(),
        
        animals: this.ranchService.animals,
        ranchSize: this.ranchService.ranchSize,
        ranchLv: this.ranchService.ranchLv,
        activeQuests: this.questManagerService.getActiveQuests(),
        completedQuests: this.questManagerService.getCompletedQuests(),
        availableQuests: this.questManagerService.getAvailableQuests(),
      };
      this.saveLoadService.save(state);
    }
    // 重置遊戲
    resetGame(): void {
      this.gameDataService.resetGame();
      this.farmService.initial();
      this.inventoryService.clear();
      this.ranchService.initial();
      this.saveGame();
    }
    // 清除遊戲存檔
    clearGame(): void {
      this.gameLoopService.stopGameLoop();
      this.saveLoadService.clear();
      console.log('遊戲已清除');
    }
    // 停止遊戲
    stopGame(): void {
      this.gameLoopService.stopGameLoop();
      this.saveGame();
    }
    // 檢查是否有存檔
    hasSavedGame(): boolean {
      return this.saveLoadService.hasSavedGame();
    }
    // 清除存檔
    clearSavedGame(): void {
      this.saveLoadService.clear();
    }

}
