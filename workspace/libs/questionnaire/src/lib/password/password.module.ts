import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password.component';


const routes: Routes = [
  { path: '', component: PasswordComponent }
];

@NgModule({
  declarations: [PasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PasswordModule { }
