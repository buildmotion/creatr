import { Injectable } from '@angular/core';
import { LoggingService } from '@valencia/logging';
import { ServiceBase } from '@valencia/foundation';

@Injectable()
export class HomeUIService extends ServiceBase {
  constructor(loggingService: LoggingService) {
    super('HomeUIService', loggingService);
  }
}
