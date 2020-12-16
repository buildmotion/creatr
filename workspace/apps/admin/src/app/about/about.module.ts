import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';

const routes: Routes = [{ path: '', component: AboutComponent }];

@NgModule({
  declarations: [AboutComponent],
  imports: [AboutRoutingModule, RouterModule.forChild(routes)],
})
export class AboutModule {}
