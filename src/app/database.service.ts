import { Injectable } from '@angular/core';
import { Score } from './model/score';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private users: Array<User> = [];
  private scores: Array<Score> = [];

  constructor() {
    let users = localStorage.getItem('users');
    let scores = localStorage.getItem('scores');

    if (users) {
      this.users = JSON.parse(users);
    } else {
      this.users.push({
        nickname: "admin",
        username: "admin",
        password: "123456",
        role: "admin"
      });

      localStorage.setItem('users', JSON.stringify(this.users));
    }

    if (scores) {
      this.scores = JSON.parse(scores);
    } else {
      localStorage.setItem('scores', JSON.stringify(this.scores));
    }
  }

  public saveUsersToLocalStorage(): void {
    if (this.users) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }

  public saveScoresToLocalStorage(): void {
    if (this.scores) {
      localStorage.setItem('scores', JSON.stringify(this.scores));
    }
  }

  public getUserDetails(user: User): GetUserResponse {
    let result = this.users.find((f: User) => {
      return (f.username == user.username) &&
        (f.nickname == user.nickname) &&
        (f.password == user.password);
    });

    if (result) {
      return new GetUserResponse(200, result);
    } else {
      user.role = "user";
      this.users.push(user);
      this.saveUsersToLocalStorage();
      return new GetUserResponse(201, user);
    }
  }

  public getScoreLists(): Array<Score> {
    return this.scores;
  }

  public setScore(score: Score): void {
    this.scores.push(score);
    this.saveScoresToLocalStorage();
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
