import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { TrimValueAccessor } from './directives/trim-value-accessor';

@NgModule({
  imports: [ngCommonModule],
  declarations: [DigitOnlyDirective, TrimValueAccessor],
  exports: [DigitOnlyDirective, TrimValueAccessor],
})
export class CommonModule {}
