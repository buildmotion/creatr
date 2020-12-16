import { Injectable } from '@angular/core';
import { Severity } from './severity.enum';
import { ILoggingConfig, IConfiguration } from '@valencia/configuration';
import { Subject } from 'rxjs';
import { ILogEntry } from './i-log-entry';

@Injectable()
export class LoggingServiceMock {
  serviceName = 'LoggingServiceMock';
  source: string;
  severity: Severity;
  message: string;
  stack: string;
  timestamp: Date;
  applicationName = 'application';
  version = '0.0.0';
  isProduction: boolean;
  loggingConfig: ILoggingConfig;

  logEntries$: Subject<ILogEntry> = new Subject<ILogEntry>();

  setupConfiguration(settings: IConfiguration) {}

  log(source: string, severity: Severity, message: string, stack: string, tags?: string[]);
  log(source: string, severity: Severity, message: string, stack?: string, tags?: string[]);
  log(source: string, severity: Severity, message: string, stack: string, tags?: string[]);
  log(source: string, severity: Severity, message: string, stack: string, tags: string[]) {}
}
