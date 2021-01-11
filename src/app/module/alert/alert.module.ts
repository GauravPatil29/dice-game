import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertContainerComponent } from './components/alert-container/alert-container.component';
import { AlertComponent } from './components/alert/alert.component';
import { AlertService } from './providers/alert.service';

@NgModule({
  declarations: [
    AlertContainerComponent,
    AlertComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AlertService
  ],
  exports: [
    AlertContainerComponent,
    // AlertService
  ]
})
export class AlertModule { }
