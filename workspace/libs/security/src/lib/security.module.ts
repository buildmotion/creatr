import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      { path: 'change-password', loadChildren: () => import('./change-password/change-password.module').then((m) => m.ChangePasswordModule) },
      { path: 'create-account', loadChildren: () => import('./create-account/create-account.module').then((m) => m.CreateAccountModule) },
      { path: 'forgot-password', loadChildren: () => import('./forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule) },
      { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule) },
      { path: 'logout', loadChildren: () => import('./logout/logout.module').then((m) => m.LogoutModule) },
      { path: 'verify-account', loadChildren: () => import('./verify-account/verify-account.module').then((m) => m.VerifyAccountModule) },
    ]),
  ],
  declarations: [],
  exports: [],
})
export class SecurityModule {}
