import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alert, AlertType } from '../module/alert/model/alert';
import { AlertService } from '../module/alert/providers/alert.service';
import { SharedService } from '../shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private sharedService: SharedService,
    private alertService: AlertService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.sharedService.getCurrentUser();
    if (user && user.role == "admin") {
      return true;
    }
    this.alertService.show(new Alert(AlertType.Warning, "You need to login as admin", true, 2));
    this.router.navigate(['login']);
    return false;
  }

}
