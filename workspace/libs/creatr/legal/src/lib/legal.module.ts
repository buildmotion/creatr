import { Route, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export const legalRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then((m) => m.TermsAndConditionsModule),
  },
  {
    path: 'terms-and-conditions',
    loadChildren: () => import('./terms-and-conditions/terms-and-conditions.module').then((m) => m.TermsAndConditionsModule),
  },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then((m) => m.PrivacyModule) },
  { path: 'cookies-policy', loadChildren: () => import('./cookies-policy/cookies-policy.module').then((m) => m.CookiesPolicyModule) },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(legalRoutes)],
})
export class LegalModule {}
