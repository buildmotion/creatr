import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { LowercaseDatePipe } from './lowercase-date/lowercase-date.pipe';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const MATERIAL_DESIGN_MODULES = [
  MatButtonModule,
  MatRadioModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatCommonModule,
  MatFormFieldModule,
  MatSelectModule,
];

@NgModule({
  imports: [CommonModule, RouterModule, ...MATERIAL_DESIGN_MODULES],
  declarations: [FooterComponent, MainLayoutComponent, LowercaseDatePipe],
  exports: [FooterComponent, MainLayoutComponent],
})
export class LayoutsModule {}
