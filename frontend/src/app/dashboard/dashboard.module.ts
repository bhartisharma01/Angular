import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MaterialModule } from '../shared/material-module';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constant';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { 
  
}
