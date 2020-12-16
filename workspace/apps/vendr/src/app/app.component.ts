import { Component } from '@angular/core';
import { ComponentBase } from '@valencia/foundation';
import { LoggingService } from '@valencia/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'buildmotion-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ComponentBase {
  title = 'vendr';

  /**
   *
   */
  constructor(loggingService: LoggingService, router: Router) {
    super('AppComponent.vendr', loggingService, router);
  }
}
