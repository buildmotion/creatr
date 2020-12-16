import { Type, inject, InjectFlags } from '@angular/core';
import { ServiceBase } from './service-base';
import { LoggingService } from '@valencia/logging';

export class SingletonServiceBase extends ServiceBase {
  constructor(type: Type<any>, loggingService: LoggingService, serviceName: string) {
    super(serviceName, loggingService);
    // tslint:disable-next-line: no-bitwise
    const parent = inject(type, InjectFlags.Optional | InjectFlags.SkipSelf);
    if (parent) {
      throw Error(`Cannot create multiple instances of provider: [${type}]`);
    }
  }
}
