import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private _money = new BehaviorSubject<number>(100);
  private _time = new BehaviorSubject<Date>(new Date());

  get money(): number {
    return this._money.value;
  }
  set money(value: number) {
    this._money.next(value);
  }
  addMoney(amount: number): void {
    this._money.next(this._money.value + amount);
  }
  subMoney(amount: number): void {
    this._money.next(this._money.value - amount);
  }
  get time(): Date {
    return this._time.value;
  }
  set time(value: Date) {
    this._time.next(value);
  }
  updateTime(millisecondsToAdd: number = 2000){
    const newTime = this._time.getValue().getTime() + millisecondsToAdd;
    this._time.next(new Date(newTime));
  }
  resetGame(): void {
    this._money.next(100);
    this._time.next(new Date());
  }
}
