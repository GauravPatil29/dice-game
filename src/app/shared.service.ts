import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Score } from './model/score';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentUser !: User;

  constructor(
    private dbService: DatabaseService
  ) { }

  private convertToCSV(objArray: Array<object>, headerList: Array<string>): string {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row = 'Sr,';

    for (let index in headerList) {
      row += headerList[index] + ',';
    }

    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 0; i < array.length; i++) {
      let line = (i + 1) + '';
      for (let index in headerList) {
        let head = headerList[index];
        line += ',' + array[i][head];
      }
      str += line + '\r\n';
    }

    return str;
  }

  public downloadCSVFile(data: Array<object>, filename = 'data'): void {

    let csvData = this.convertToCSV(data, ['nickname', 'score', 'timeTaken']);

    console.log(csvData);

    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);

    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;

    if (isSafariBrowser) {
      dwldLink.setAttribute("target", "_blank");
    }

    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setScore(score: Score): void {
    this.dbService.setScore(score);
  }
}
