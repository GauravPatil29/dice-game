import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';
import { Score } from './model/score';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private currentUser !: User;

  constructor(
    private dbService: DatabaseService,
    private router: Router
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

  public downloadCSVFile(data: Array<Score>, filename = 'data'): void {

    let csvData = this.convertToCSV(data, ['nickname', 'score', 'time']);

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

  public authenticateUser(user: User): Promise<AuthenticatorResponse> {
    return new Promise<AuthenticatorResponse>((resolve, reject) => {

      this.dbService.getUserDetails(user).then((response) => {

        this.setCurrentUser(response.user);

        if (response.status == 201) {
          resolve(new AuthenticatorResponse(201, response.user));
        } else {
          resolve(new AuthenticatorResponse(200, response.user));
        }

      }).catch((error) => reject(error));

    });
  }

  public setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public getAllScore(): Promise<Array<Score>> {
    return new Promise<Array<Score>>((resolve, reject) => {

      this.dbService.getScoreLists().then((response) => {

        resolve(response);

      }).catch((error) => reject(error));

    });
  }

  public setScore(score: Score): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.dbService.setScore(score).then(() => resolve()).catch((error) => reject(error));
    });
  }

  public signOut(): void {
    this.setCurrentUser(null);
    this.router.navigateByUrl('login');
  }
}

class AuthenticatorResponse {
  status: number;
  user: User;

  constructor(status: number, user: User) {
    this.status = status;
    this.user = user;
  }
}
