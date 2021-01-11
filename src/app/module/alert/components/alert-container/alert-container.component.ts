import { Component, OnInit } from '@angular/core';
import { Alert } from '../../model/alert';
import { AlertService } from '../../providers/alert.service';

@Component({
  selector: 'alert-container',
  templateUrl: './alert-container.component.html',
  styleUrls: ['./alert-container.component.scss']
})
export class AlertContainerComponent implements OnInit {

  public alerts: Array<Alert> = [];

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.alertService.alerts.subscribe((alerts: Array<Alert>) => {
      this.alerts = alerts;
    });
  }

}
