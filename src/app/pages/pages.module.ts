import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './pages-routing.module';

@NgModule({
  declarations: [
    ProfileComponent, 
    DashboardComponent, 
    ProgressComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProfileComponent,
    DashboardComponent,
    ProgressComponent
  ]
})
export class PagesModule {}
