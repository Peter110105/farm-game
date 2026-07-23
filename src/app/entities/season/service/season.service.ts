import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SeasonType, WeatherType } from '../season.model';
import { GameDataService } from '../../../core/game-data/game-data.service';
import { SeasonData, WeatherData } from '../season.data';

/**
 * SeasonService - 季節系統核心服務
 * 職責：
 * 1. 管理當前季節、天數、天氣狀態
 * 2. 計算季節/天數轉換
 * 3. 隨機生成天氣並定期更新
 * 4. 提供季節檢查方法（如：檢查作物是否可種植）
 *
 * 時間配置：
 * - 1 個遊戲天 = 10 分鐘（600 秒）
 * - 1 個遊戲季節 = 30 天（18000 秒 = 5 小時）
 * - 1 年 = 4 季節 = 120 天（20 小時）
 * - 天氣每天變化一次（隨機）
 */
@Injectable({
  providedIn: 'root',
})
export class SeasonService {
  // ===== 時間配置常數 =====
  private readonly GAME_DAY_MS = 600000; // 1 遊戲天 = 10 分鐘
  private readonly DAYS_PER_SEASON = 30; // 1 季節 = 30 天

  // ===== 狀態管理（BehaviorSubject 供訂閱） =====
  private _currentSeason = new BehaviorSubject<SeasonType>('spring');
  private _currentWeather = new BehaviorSubject<WeatherType>('sunny');
  private _dayOfSeason = new BehaviorSubject<number>(1);

  // 公開 Observable 供外部訂閱
  currentSeason$ = this._currentSeason.asObservable();
  currentWeather$ = this._currentWeather.asObservable();
  dayOfSeason$ = this._dayOfSeason.asObservable();

  // ===== 內部進度追蹤 =====
  // 尚未滿一天的累積遊戲時間（毫秒），用來判斷何時該推進到下一天
  private dayProgressMs = 0;
  // 上一次呼叫 updateSeason() 時的 GameDataService.time 值（毫秒）
  private lastProcessedTime = 0;

  constructor(private gameDataService: GameDataService) {}

  /**
   * 初始化季節系統
   * 被 GameManagerService.initialGame() 呼叫
   */
  initialize(): void {
    this._currentSeason.next('spring');
    this._currentWeather.next('sunny');
    this._dayOfSeason.next(1);
    console.log('季節系統已初始化');
  }

  /**
   * 從存檔載入季節狀態
   * 被 GameManagerService 在讀檔時呼叫
   *
   * @param currentSeason - 存檔中的季節
   * @param dayOfSeason - 存檔中季節內的第幾天
   * @param currentWeather - 存檔中的天氣
   * @param dayProgressMs - 存檔中「當天已累積」的遊戲時間（毫秒），預設 0
   */
  load(
    currentSeason: SeasonType,
    dayOfSeason: number,
    currentWeather: WeatherType,
    dayProgressMs: number = 0,
  ): void {
    this._currentSeason.next(currentSeason);
    this._dayOfSeason.next(dayOfSeason);
    this._currentWeather.next(currentWeather);
    this.dayProgressMs = dayProgressMs;
    // 重要：讀檔當下的 GameDataService.time 已經是還原後的時間，
    // 從這個時間點開始重新累積，避免把讀檔前的真實世界時間差算進去
    this.lastProcessedTime = this.gameDataService.time.getTime();
    console.log(
      `[SeasonService] 季節狀態已從存檔載入: ${currentSeason} 第 ${dayOfSeason} 天, 天氣: ${currentWeather}`,
    );
  }

  reset(): void {
    this.initialize();
  }

  /**
   * 每個遊戲循環 tick 呼叫一次
   * 由 GameManagerService.registerCallbacks() 統一註冊，
   * 跟其他服務（farmService、ranchService）一樣由 GameLoopService 驅動
   *
   * 邏輯：
   * 1. 計算「這次 tick 經過了多少遊戲時間」（用 GameDataService.time 的差值）
   * 2. 累加到 dayProgressMs
   * 3. 若累積滿一整天（GAME_DAY_MS），推進到下一天，並可能推進季節
   * 4. 用 while 迴圈處理「一次經過多天」的情況（例如遊戲時間被大幅調快）
   */
  updateSeason(): void {
    const now = this.gameDataService.time.getTime();
    const delta = now - this.lastProcessedTime;
    this.lastProcessedTime = now;

    // 防呆：時間沒有前進（例如剛讀檔的第一個 tick）就不處理
    if (delta <= 0) return;

    this.dayProgressMs += delta;

    while (this.dayProgressMs >= this.GAME_DAY_MS) {
      this.dayProgressMs -= this.GAME_DAY_MS;
      this.nextDay();
    }
  }
  /**
   * 推進一天
   * - 天數 +1，超過 30 天則進入下一季節
   * - 天氣每天變化一次（在這裡觸發，而非用獨立計時器）
   */
  private nextDay(): void {
    let nextDay = this._dayOfSeason.value + 1;

    if (nextDay > this.DAYS_PER_SEASON) {
      nextDay = 1;
      this.nextSeason();
    }

    this._dayOfSeason.next(nextDay);

    // 天氣一天變化一次
    this.changeWeather();

    console.log(
      `[SeasonService] 進入第 ${nextDay} 天（${this._currentSeason.value}）`,
    );
  }

  /**
   * 推進到下一個季節
   */
  private nextSeason(): void {
    const seasonOrder: SeasonType[] = ['spring', 'summer', 'autumn', 'winter'];
    const currentIndex = seasonOrder.indexOf(this._currentSeason.value);
    const nextSeason = seasonOrder[(currentIndex + 1) % seasonOrder.length];
    this._currentSeason.next(nextSeason);
    console.log(`[SeasonService] 季節變更: ${nextSeason}`);
  }

  /**
   * 隨機選擇並設定當天天氣
   * 只在 nextDay() 中被呼叫，確保「一天只變一次」
   */
  private changeWeather(): void {
    const weathers = WeatherData.map((w) => w.type);
    const randomWeather = weathers[
      Math.floor(Math.random() * weathers.length)
    ] as WeatherType;
    this._currentWeather.next(randomWeather);
  }

  // ===== 查詢方法 =====

  /** 取得當前季節類型 */
  getCurrentSeason(): SeasonType {
    return this._currentSeason.value;
  }

  /** 取得當前季節的詳細資訊 */
  getCurrentSeasonInfo() {
    return SeasonData.find((s) => s.id === this._currentSeason.value);
  }

  /** 取得當前天氣類型 */
  getCurrentWeatherType(): WeatherType {
    return this._currentWeather.value;
  }

  /** 取得當前天氣的詳細資訊 */
  getCurrentWeather() {
    return WeatherData.find((w) => w.type === this._currentWeather.value);
  }

  /** 取得當前季節內的天數（1-30） */
  getDayOfSeason(): number {
    return this._dayOfSeason.value;
  }

  /**
   * 取得當天已累積的進度（毫秒）
   * 用於存檔，確保讀檔後天數推進的精確度不會遺失
   */
  getDayProgressMs(): number {
    return this.dayProgressMs;
  }

  /**
   * 檢查作物是否可在當前季節種植
   * 使用情境：FarmService.tryPlant() 時檢查季節限制
   */
  canPlantInCurrentSeason(plantableSeasons: string[]): boolean {
    return plantableSeasons.includes(this._currentSeason.value);
  }

  /** 檢查是否是冬季 */
  isWinter(): boolean {
    return this._currentSeason.value === 'winter';
  }

  /** 取得剩餘季節天數 */
  getRemainingDaysInSeason(): number {
    return this.DAYS_PER_SEASON - this._dayOfSeason.value;
  }
}
