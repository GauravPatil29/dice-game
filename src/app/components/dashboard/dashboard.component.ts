import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/model/score';
import { Alert, AlertType } from 'src/app/module/alert/model/alert';
import { AlertService } from 'src/app/module/alert/providers/alert.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public scores: Array<Score> = [];

  constructor(
    private sharedService: SharedService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.sharedService.getAllScore().then((scores) => {
      this.scores = scores;
    }).catch((error) => {
      console.error(error);
      this.alertService.show(new Alert(AlertType.Danger, "Could not get scores details", true));
    });
  }

  exportToCSV(): void {
    this.sharedService.downloadCSVFile(this.scores);
  }

}
