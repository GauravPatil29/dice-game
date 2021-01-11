import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/model/score';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public scores: Array<Score> = [];

  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.scores = this.sharedService.getAllScore();
  }

  exportToCSV(): void {
    this.sharedService.downloadCSVFile(this.scores);
  }

}
