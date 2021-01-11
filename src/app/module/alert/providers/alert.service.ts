import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert, AlertType } from '../model/alert';

@Injectable()
export class AlertService {

  private _alerts: BehaviorSubject<Array<Alert>> = new BehaviorSubject<Array<Alert>>([]);

  public get alerts(): Observable<Array<Alert>> { return this._alerts.asObservable(); }

  constructor() {
  }

  public show(alert: Alert): void {
    const updatedArray = this._alerts.value;
    updatedArray.push(alert);
    this._alerts.next(updatedArray);
  }

  public remove(alert: Alert): void {
    const updatedArray = this._alerts.value;
    updatedArray.splice(updatedArray.findIndex((f) => f == alert), 1);
    this._alerts.next(updatedArray);
  }
}
