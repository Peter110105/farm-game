import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CropService } from '../../entities/crop/service/crop.service';
import { Crop, DetailedCrop } from '../../entities/crop/crop.model';
import { FarmService } from './service/farm-service';

/**
 * FarmComponent - 農田 UI 元件
 * 職責：
 * 1. 顯示農田格和狀態
 * 2. 處理用戶的種植和收穫操作
 * 3. 管理農田升級 UI
 */
@Component({
  selector: 'app-farm-plot',
  imports: [CommonModule, FormsModule],
  standalone: true,
  providers: [CropService],
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.css'],
})
export class FarmComponent implements OnInit {
  crops: DetailedCrop[] = [];
  selectedCrop!: DetailedCrop;
  constructor(
    private cropService: CropService,
    protected farmService: FarmService,
  ) {}

  ngOnInit() {
    // 取得所有農作物（輕量級，只含 ID）
    this.crops = this.cropService.getAllCrops();
    this.selectedCrop = this.crops[0];
  }

  /**
   * 處理農田格點擊事件
   * 邏輯：
   * 1. 若空農田 → 種植選中的作物
   * 2. 若已成熟 → 收穫
   * 關鍵步驟：
   * - 需要補全 Crop 資訊後再傳給 FarmService
   * - 這是 UI 層和業務層的交界點
   * @param index - 農田格位置
   */
  onTileClick(index: number): void {
    const status = this.farmService.fields[index].status;
    if (status === 'empty') {
      if (!this.selectedCrop) {
        console.warn('未選擇任何作物');
        return;
      }
      try {
        const result = this.farmService.tryPlant(index, this.selectedCrop);

        if (!result.success) {
          alert(result.message);
          console.error(result.message);
        }
      } catch (error) {
        console.error('種植失敗:', error);
        alert('種植失敗，請檢查資料配置');
      }
    } else if (status === 'grown') {
      this.farmService.harvest(index);
    }
  }

  /**
   * 根據農田狀態返回對應的 emoji
   * @param status - 農田狀態 ('empty' | 'planted' | 'grown')
   * @param crop - 該格的農作物
   * @returns 顯示的 emoji 符號
   */
  getEmoji(status: string, crop: Crop | null): string {
    switch (status) {
      case 'empty':
        return '🟫';
      case 'planted':
        return '🌱';
      case 'grown':
        if (crop) {
          const detailedCrop = this.cropService.getCropBySeedId(crop.seedItemId);
          return detailedCrop?.produceItem.icon || '🌾';
        }
        return '🌾';
      default:
        return '❓';
    }
  }

  /**
   * 計算網格欄數
   * 根據農田數量動態調整網格大小
   * 例如：9 格 → 3x3，12 格 → 3x4
   * @returns CSS grid-template-columns 的值
   */
  getGridColumns(): string {
    const colCount = Math.ceil(Math.sqrt(this.farmService.fields.length));
    return `repeat(${colCount}, 80px)`;
  }

  /**
   * 處理農田升級
   */
  upgrade(): void {
    const result = this.farmService.tryUpgradeFarm();
    if (!result.success) {
      alert(result.message);
      console.error(result.message);
    } else {
      console.log('農田升級成功');
    }
  }
}
