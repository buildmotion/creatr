import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CookiesPolicyRoutingModule } from './cookies-policy-routing.module';
import { CookiesPolicyComponent } from './cookies-policy.component';

const routes: Routes = [
  { path: '', component: CookiesPolicyComponent }
];

@NgModule({
  declarations: [CookiesPolicyComponent],
  imports: [
    CommonModule,
    CookiesPolicyRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class CookiesPolicyModule { }
