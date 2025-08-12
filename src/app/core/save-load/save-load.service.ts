import { Injectable } from '@angular/core';
import { GameState } from '../../entities/game-state/game-state-model';

@Injectable({
  providedIn: 'root'
})
export class SaveLoadService {
  private readonly STORAGE_KEY = 'gameState';

  // 載入遊戲階段
    load(): GameState | null {
      try{
        const json = localStorage.getItem(this.STORAGE_KEY);
        if (!json) {
          return null;
        }
        return JSON.parse(json);
      }catch (error){
        console.error('讀取遊戲失敗:', error);
        return null;
      }
    }
    // 保存遊戲階段
    save(state: GameState): boolean {
      try{
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        return true;
      }catch (error){
        console.error('儲存遊戲失敗:', error);
        return false;
      }
      
    }
    // 清除存檔
    clear(): void {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    // 檢查是否有存檔
    hasSavedGame(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}
