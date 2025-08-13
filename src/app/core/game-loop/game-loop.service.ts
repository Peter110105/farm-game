import { Injectable, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameDataService } from '../game-data/game-data.service';

@Injectable({
  providedIn: 'root'
})
export class GameLoopService implements OnDestroy {
  private gameLoopSubscription?: Subscription;
  private updateCallbacks: Array<() => void> = [];
  private saveCallbacks: Array<() => void> = [];

  constructor(private gameDataService: GameDataService){}

  startGameLoop(updateIntervalMs: number = 1000): void {
    if(this.gameLoopSubscription){
      console.log('遊戲已在運行中');
      return 
    }
    this.gameLoopSubscription = interval(updateIntervalMs).subscribe(() => {
      // 更新遊戲時間
      this.gameDataService.updateTime();

       // 執行所有更新回調
      this.updateCallbacks.forEach(callback => {
        try {
          callback();
        } catch (error) {
          console.error('遊戲循環更新出錯:', error);
        }
      });

      // 執行所有保存回調
      this.saveCallbacks.forEach(callback => {
        try {
          callback();
        } catch (error) {
          console.error('遊戲循環保存出錯:', error);
        }
      });
    })
    console.log('遊戲循環已啟動');
  }

  // 停止遊戲循環
  stopGameLoop(): void {
    if (this.gameLoopSubscription) {
      this.gameLoopSubscription.unsubscribe();
      this.gameLoopSubscription = undefined;
      console.log('遊戲循環已停止');
    }
  }

  // 註冊更新回調
  registerUpdateCallback(callback: () => void): void {
    this.updateCallbacks.push(callback);
  }

  // 註冊保存回調
  registerSaveCallback(callback: () => void): void {
    this.saveCallbacks.push(callback);
  }

  // 移除更新回調
  removeUpdateCallback(callback: () => void): void {
    const index = this.updateCallbacks.indexOf(callback);
    if (index !== -1) {
      this.updateCallbacks.splice(index, 1);
    }
  }

  // 移除保存回調
  removeSaveCallback(callback: () => void): void {
    const index = this.saveCallbacks.indexOf(callback);
    if (index !== -1) {
      this.saveCallbacks.splice(index, 1);
    }
  }

  ngOnDestroy(): void {
    this.stopGameLoop();
  }

}
