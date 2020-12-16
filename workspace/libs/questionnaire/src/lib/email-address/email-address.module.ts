import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EmailAddressComponent } from './email-address.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: EmailAddressComponent }];

@NgModule({
  declarations: [EmailAddressComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EmailAddressModule {}
