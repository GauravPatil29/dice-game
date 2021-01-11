import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public userLoggedIn: boolean = false;

  constructor(
    public sharedService: SharedService
  ) {

  }

  ngOnInit(): void {
  }

  signout() {
    console.log("called");
    this.sharedService.signOut();
  }
}
