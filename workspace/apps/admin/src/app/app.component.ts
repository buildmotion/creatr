import { LoggingService, Severity } from '@valencia/logging';

import { Component } from '@angular/core';
import { ComponentBase } from '@valencia/foundation';
import { Router } from '@angular/router';

@Component({
  selector: 'buildmotion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ComponentBase {
  title = 'admin';

  constructor(loggingService: LoggingService, router: Router) {
    super('AppComponent', loggingService, router);
    this.loggingService.log(this.componentName, Severity.Information, `Loading the [${this.componentName}] for the admin application.`);
  }
}
