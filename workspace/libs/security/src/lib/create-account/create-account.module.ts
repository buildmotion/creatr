import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IgxIconModule, IgxInputGroupModule } from 'igniteui-angular';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountRoutingModule } from './create-account-routing.module';
import { NgModule } from '@angular/core';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';

const routes: Routes = [{ path: '', component: CreateAccountComponent }];

const IGNITE_MODULES = [IgxIconModule, IgxInputGroupModule];

@NgModule({
  declarations: [CreateAccountComponent, PasswordStrengthComponent],
  imports: [CommonModule, ...IGNITE_MODULES, CreateAccountRoutingModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), ...IGNITE_MODULES],
})
export class CreateAccountModule {}
