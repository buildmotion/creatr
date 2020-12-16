import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'buildmotion-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  copyrightYear: string; // = new Date().getFullYear();
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor() {}

  ngOnInit(): void {
    this.setCopyrightDisplay();
  }

  private setCopyrightDisplay(): string {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    if (currentYear > startYear) {
      this.copyrightYear = `${startYear}-${currentYear}`;
    } else {
      this.copyrightYear = startYear.toString();
    }
    return this.copyrightYear;
  }
}
