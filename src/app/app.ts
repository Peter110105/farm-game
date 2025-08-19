import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { GameManagerService } from './core/game-manager/game-manager.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NzLayoutModule, NzMenuModule, NzModalModule],
  templateUrl: './app.html',
  styleUrl: './app.scss', 
})
export class App {
  gameStarted = false; // 控制遊戲是否已開始

  constructor(private router: Router, private gameMangerService: GameManagerService, private modalService: NzModalService) {}
  
  newGame(){
    if (this.gameStarted) {
      return; // 如果遊戲已經開始，則不執行任何操作
    }
    if(this.gameMangerService.hasSavedGame()){
      this.modalService.warning({
        nzTitle: '警告',
        nzContent: '已經有保存的遊戲，確定要開始新的一局嗎?',
        nzOnOk: () => {
          this.startGame(true); // 啟動新遊戲，重置遊戲狀態
        },
        nzOnCancel: () => {
          console.log('取消開始新遊戲');
        }
      });
    }else{
      this.startGame(true); // 啟動新遊戲
    }
  }

  // 繼續遊戲
  continueGame(){
    // 如果遊戲已經開始，則不執行任何操作
    if (this.gameStarted) {
      return; // 如果遊戲已經開始，則不執行任何操作
    }
    if(!this.gameMangerService.hasSavedGame()) {
      this.modalService.warning({
        nzTitle: '警告',
        nzContent: '沒有已保存的遊戲，無法繼續遊戲',
      });
      console.error('沒有已保存的遊戲，無法繼續遊戲');
      return; // 如果沒有已保存的遊戲，則不執行任何操作
    }
    this.startGame(false); // 啟動遊戲
  }

  // 啟動遊戲
  private startGame(reset: boolean = false) {
    if(reset){
      this.gameMangerService.resetGame(); // 重置遊戲
    }
    this.gameMangerService.initialGame(); // 初始化遊戲
    this.gameStarted = true; // 設置遊戲已開始
    this.router.navigate(['/farm']);
  }

  // 重置遊戲
  clearGame() {
    this.modalService.confirm({
      nzTitle: '警告',
      nzContent: '確定要清除遊戲存檔嗎？',
      nzOnOk: () => {
        this.gameMangerService.clearGame(); // 清除遊戲存檔
      },
    });
  }
  // 打開遊戲設定
  openSettings(){
    console.log('打開遊戲設定');
    // 這裡可以實現打開設定頁面的邏輯

  }
  // 打開關於頁面
  openAbout(){
    console.log('打開關於頁面');
    // 這裡可以實現打開關於頁面的邏輯
  }
}
