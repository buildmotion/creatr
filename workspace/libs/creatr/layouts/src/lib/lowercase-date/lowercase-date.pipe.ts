import { LoggingService, Severity } from '@valencia/logging';
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Yes, you can inject services, configuration, and other things
 * into the constructor.
 */
@Pipe({
  name: 'lowercaseDate',
})
export class LowercaseDatePipe implements PipeTransform {
  constructor(private loggingService: LoggingService) {
    this.loggingService.log(`LowercaseDatePipe`, Severity.Information, `Running custom pipe.`);
  }

  transform(value: Date, ...args: unknown[]): unknown {
    // return date string as lowercase
    // validate for date;
    // use [any] --> (Security: user/roles/permission); any...
    return value.toDateString().toLowerCase();
  }
}
