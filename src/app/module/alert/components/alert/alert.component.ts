import { Component, Input, OnInit } from '@angular/core';
import { Alert } from '../../model/alert';
import { AlertService } from '../../providers/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() alert !: Alert;

  public isHidden: boolean = false;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    let time: number = 0;
    if (this.alert.timeInSeconds) {
      time = this.alert.timeInSeconds * 1000;
    }

    setTimeout(() => {
      this.isHidden = true;
      setTimeout(() => { this.alertService.remove(this.alert); }, 500);
    }, time);
  }

}
