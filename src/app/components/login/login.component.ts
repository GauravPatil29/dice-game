import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert, AlertType } from 'src/app/module/alert/model/alert';
import { AlertService } from 'src/app/module/alert/providers/alert.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public autoValidate: boolean = false;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nickname: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {

  }

  public async login(): Promise<void> {
    if (this.loginForm.valid) {

      let user = this.loginForm.value;

      this.sharedService.authenticateUser(user).then((response) => {
        if (response.user.role == "admin") {
          this.autoValidate = false;

          this.alertService.show(new Alert(AlertType.Success, "Logged in as admin", true));
          this.router.navigateByUrl("dashboard");
          return;
        }

        if (response.status == 201) {
          this.alertService.show(new Alert(AlertType.Success, "User created and logged in successfully", true));
          this.router.navigateByUrl("game");
        } else {
          this.alertService.show(new Alert(AlertType.Success, "Logged in successfully", true));
          this.router.navigateByUrl("game");
        }

        this.autoValidate = false;
      }).catch((error) => {
        console.error(error);
        this.alertService.show(new Alert(AlertType.Danger, "Server error", true));
      });

    } else {
      this.autoValidate = true;

      this.alertService.show(new Alert(AlertType.Danger, "Please provide an valid input", true));
    }
  }

}
