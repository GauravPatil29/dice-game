import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Score } from './model/score';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // private API_URL: string = "http://localhost:4201";
  private API_URL: string = "https://us-central1-project-e96e4.cloudfunctions.net/api";

  constructor(
    private http: HttpClient
  ) { }

  public getUserDetails(user: User): Promise<GetUserResponse> {
    return new Promise<GetUserResponse>((resolve, reject) => {

      this.http.post(this.API_URL + "/users", { user: user }, { observe: 'response' }).subscribe((response) => {
        const status = response.status;
        const users: any = response.body;

        resolve(new GetUserResponse(status, users));
      }, (error) => reject(error));

    });
  }

  public getScoreLists(): Promise<Array<Score>> {
    return new Promise<Array<Score>>((resolve, reject) => {

      this.http.get(this.API_URL + "/scores", { observe: 'response' }).subscribe((response) => {
        const status = response.status;
        const scores: any = response.body;

        resolve(Object.assign(scores));
      }, (error) => reject(error));

    });
  }

  public setScore(score: Score): Promise<void> {
    return new Promise<void>((resolve, reject) => {

      this.http.post(this.API_URL + "/scores", { score: score }, { observe: 'response' }).subscribe((response) => {

        const status = response.status;
        resolve();

      }, (error) => reject(error));

    });
  }

}

class GetUserResponse {
  status: number;
  user: User;

  constructor(status: number, user: User) {
    this.status = status;
    this.user = user;
  }
}
