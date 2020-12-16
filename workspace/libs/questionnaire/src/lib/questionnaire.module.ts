import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QConfigurationContext } from './configuration-context';
import { QuestionnaireComponent } from './questionnaire.component';
import { QuestionnaireNavigationComponent } from './questionnaire-navigation/questionnaire-navigation.component';
import { qConfig } from './q.config';

/**
 * Use a parent/child route combination to load target [question] routes
 * into the `router-outlet` of the parent component.
 *
 * - you can [guard] the parent route and protect the children.
 * - use [ActivatedRoute] to retrieve route parameters from parent/child
 *   - see: https://www.bennadel.com/blog/3343-accessing-parent-and-child-route-segment-parameters-in-angular-4-4-4.htm
 * - use routes to pass [data]
 * - use routes to pass [querystring] items
 */
const routes: Routes = [
  {
    path: ':name',
    component: QuestionnaireComponent,
    children: [
      { path: 'company-info', loadChildren: () => import('./company-info/company-info.module').then((m) => m.CompanyInfoModule) },
      { path: 'contact-info', loadChildren: () => import('./contact-info/contact-info.module').then((m) => m.ContactInfoModule) },
      { path: 'email-address', loadChildren: () => import('./email-address/email-address.module').then((m) => m.EmailAddressModule) },
      { path: 'password', loadChildren: () => import('./password/password.module').then((m) => m.PasswordModule) },
      { path: 'verify-account', loadChildren: () => import('./verify-account/verify-account.module').then((m) => m.VerifyAccountModule) },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
  declarations: [QuestionnaireComponent, QuestionnaireNavigationComponent],
  providers: [
    {
      provide: QConfigurationContext,
      useValue: { config: qConfig },
    },
  ],
})
export class QuestionnaireModule {}
