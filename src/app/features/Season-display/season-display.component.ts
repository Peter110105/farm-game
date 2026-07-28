import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonService } from '../../entities/season/service/season.service';
import { Season, Weather } from '../../entities/season/season.model';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-season-display-component',
  imports: [CommonModule, NzProgressModule, NzStatisticModule],
  templateUrl: './season-display.component.html',
  styleUrl: './season-display.component.css',
})
export class SeasonDisplayComponent implements OnInit, OnDestroy {
  currentSeasonInfo: Season | undefined;
  currentWeather: Weather | undefined;
  dayOfSeason: number = 1;
  seasonProgress: number = 0;

  private destroy$ = new Subject<void>();

  constructor(private seasonService: SeasonService) {}

  ngOnInit(): void {
    // 訂閱季節變化
    this.seasonService.currentSeason$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentSeasonInfo = this.seasonService.getCurrentSeasonInfo();
      });

    // 訂閱天氣變化
    this.seasonService.currentWeather$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentWeather = this.seasonService.getCurrentWeather();
      });

    // 訂閱天數變化
    this.seasonService.dayOfSeason$
      .pipe(takeUntil(this.destroy$))
      .subscribe((day) => {
        this.dayOfSeason = day;
        this.seasonProgress = Math.floor((day / 30) * 100);
      });

    // 初始值
    this.currentSeasonInfo = this.seasonService.getCurrentSeasonInfo();
    this.currentWeather = this.seasonService.getCurrentWeather();
    this.dayOfSeason = this.seasonService.getDayOfSeason();
    this.seasonProgress = Math.floor((this.dayOfSeason / 30) * 100);
  }

  /**
   * 根據倍數返回友善的標籤
   */
  getMultiplierLabel(multiplier: number | undefined): string {
    if (!multiplier) return '正常';
    if (multiplier > 1.2) return '++加速';
    if (multiplier > 1.0) return '+加速';
    if (multiplier < 0.5) return '--減速';
    if (multiplier < 1.0) return '-減速';
    return '正常';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
