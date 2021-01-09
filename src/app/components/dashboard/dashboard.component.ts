import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public scores: Array<any> = [{
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }, {
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }, {
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }, {
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }, {
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }, {
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }, {
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }, {
    nickname: "Adam",
    score: 10,
    timeTaken: 35420
  }];

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  exportToCSV(): void {
    this.sharedService.downloadCSVFile(this.scores);
  }

}
