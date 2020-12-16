import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';

const routes: Routes = [
  { path: '', component: TermsAndConditionsComponent }
];

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    TermsAndConditionsRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class TermsAndConditionsModule { }
