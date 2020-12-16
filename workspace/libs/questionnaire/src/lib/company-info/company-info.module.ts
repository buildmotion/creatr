import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CompanyInfoComponent } from './company-info.component';


const routes: Routes = [
  { path: '', component: CompanyInfoComponent }
];

@NgModule({
  declarations: [CompanyInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyInfoModule { }
