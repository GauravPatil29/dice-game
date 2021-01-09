import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Score } from 'src/app/model/score';
import { User } from 'src/app/model/user';
import { SharedService } from 'src/app/shared.service';

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public gameCount: number = 0;
  public totalCount: number = 3;
  public totalScore: number = 0;

  public imageURL: string = "assets/1.png";

  public msgText: string = "";

  private startTime: number = 0;
  private endTime: number = 0;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.startTime = new Date().getMilliseconds();
  }

  async play(): Promise<void> {

    for (let i = 0; i < 15; i++) {
      await delay(250);
      this.imageURL = "assets/" + ((i % 6) + 1) + ".png";
    }

    let score = Math.floor(Math.random() * 6) + 1;

    this.imageURL = "assets/" + score + ".png";
    this.totalScore += score;
    this.displayMessage("You score " + score);
    this.gameCount++;

    if (this.gameCount == 3) {
      this.endTime = new Date().getMilliseconds();

      const user: User = this.sharedService.getCurrentUser();
      const score: Score = new Score(user.nickname, this.totalScore, this.endTime - this.startTime);

      this.sharedService.setScore(score);

      this.router.navigateByUrl("greet", {
        state: {
          score: score
        }
      });
    }

  }

  async displayMessage(text: string): Promise<void> {
    this.msgText = text;
    await delay(3000);
    this.msgText = "";
  }

}
