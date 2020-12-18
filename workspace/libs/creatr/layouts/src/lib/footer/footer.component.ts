import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';

import { FormControlName } from '@angular/forms';

@Component({
  selector: 'buildmotion-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  copyrightYear: string; // = new Date().getFullYear();
  lastUpdatedOn: Date = new Date();

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  constructor() {}

  ngOnInit(): void {
    this.setCopyrightDisplay();

    this.lastUpdatedOn = new Date(2021, 0, 13); // months 0-index list;
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
