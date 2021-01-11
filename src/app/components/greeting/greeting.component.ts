import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {

  public score: number = 0;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {
    this.score = this.router.getCurrentNavigation()?.extras?.state?.score.score;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.sharedService.signOut();
    }, 5000);
  }

}
