import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Score } from 'src/app/model/score';
import { User } from 'src/app/model/user';
import { Alert, AlertType } from 'src/app/module/alert/model/alert';
import { AlertService } from 'src/app/module/alert/providers/alert.service';
import { SharedService } from 'src/app/shared.service';

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public disabled: boolean = false;
  public gameCount: number = 0;
  public totalCount: number = 3;
  public totalScore: number = 0;

  public imageURL: string = "assets/1.png";

  private timer: number = 0;

  constructor(
    private sharedService: SharedService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.timer++;
    }, 10);
  }

  async play(): Promise<void> {

    this.disabled = true;

    for (let i = 0; i < 15; i++) {
      await delay(250);
      this.imageURL = "assets/" + ((i % 6) + 1) + ".png";
    }

    let score = Math.floor(Math.random() * 6) + 1;

    this.imageURL = "assets/" + score + ".png";
    this.totalScore += score;
    this.gameCount++;

    this.alertService.show(new Alert(AlertType.Info, "You score " + score));

    if (this.gameCount == 3) {

      const user: User = this.sharedService.getCurrentUser();
      const score: Score = new Score(user.nickname, this.totalScore, this.timer.valueOf() * 10);

      this.sharedService.setScore(score).then(() => {
        this.router.navigateByUrl("greet", {
          state: {
            score: score
          }
        });

      }).catch((error) => {
        console.error(error);
        this.alertService.show(new Alert(AlertType.Danger, "could not save score", true));
      });

    } else {
      this.disabled = false;
    }

  }

}
