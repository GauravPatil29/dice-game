import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GameComponent } from './components/game/game.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'greet',
    component: GreetingComponent,
    canActivate: [UserGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
