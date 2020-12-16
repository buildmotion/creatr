import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';

const routes: Routes = [
  { path: '', component: LogoutComponent }
];

@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    LogoutRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class LogoutModule { }
