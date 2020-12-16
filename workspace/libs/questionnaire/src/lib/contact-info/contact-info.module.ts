import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContactInfoComponent } from './contact-info.component';


const routes: Routes = [
  { path: '', component: ContactInfoComponent }
];

@NgModule({
  declarations: [ContactInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactInfoModule { }
