import { Component, OnInit } from '@angular/core';
import { LoggingService, Severity } from '@valencia/logging';

import { ComponentBase } from '@valencia/foundation';
import { Router } from '@angular/router';

@Component({
  selector: 'buildmotion-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends ComponentBase implements OnInit {
  constructor(loggingService: LoggingService, router: Router) {
    super('AboutComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.loggingService.log(this.componentName, Severity.Information, `Running [ngOnInit].`);
  }
}
