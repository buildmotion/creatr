import { Component, OnInit } from '@angular/core';

import { ComponentBase } from '@valencia/foundation';
import { LoggingService } from '@valencia/logging';
import { Router } from '@angular/router';

@Component({
  selector: 'buildmotion-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends ComponentBase implements OnInit {
  constructor(loggingService: LoggingService, router: Router) {
    super('HomeComponent', loggingService, router);
  }

  ngOnInit(): void {}
}
