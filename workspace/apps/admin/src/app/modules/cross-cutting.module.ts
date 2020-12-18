import { APP_INITIALIZER, ErrorHandler, ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigurationContext, ConfigurationModule, ConfigurationService } from '@valencia/configuration';
import { ConsoleWriter, LoggingModule, LoggingService, LogglyWriter } from '@valencia/logging';
import { ErrorHandlingModule, ErrorHandlingService } from '@valencia/error-handling';

import { AppConfig } from './../../config/app-config';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from '@valencia/http-service';
import { LogglyService } from 'ngx-loggly-logger';
import { NotificationService } from '@valencia/notification';

/**
 * The factory function to initialize the configuration service for the application.
 * @param configService
 */
export function initializeConfiguration(configContext: ConfigurationContext, configService: ConfigurationService) {
  return () => {
    configService.settings = configContext.config;
    return configService;
  };
}

/**
 * The factory function to initialize the logging service and writer for the
 * application.
 *
 * @param loggingService
 * @param consoleWriter
 */
export function initializeLogWriter(loggingService: LoggingService, consoleWriter: ConsoleWriter) {
  return () => {
    return consoleWriter;
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule, ConfigurationModule, ErrorHandlingModule, LoggingModule],
  providers: [],
})
export class CrossCuttingModule {
  static forRoot(): ModuleWithProviders<CrossCuttingModule> {
    return {
      ngModule: CrossCuttingModule,
      providers: [
        {
          provide: ConfigurationContext,
          useValue: { config: AppConfig },
        },
        ConfigurationService,
        LoggingService,
        ConsoleWriter,
        LogglyWriter,
        {
          provide: APP_INITIALIZER,
          useFactory: initializeConfiguration,
          deps: [ConfigurationContext, ConfigurationService],
          multi: true,
        },
        ConsoleWriter,
        LogglyService,
        LogglyWriter,
        LoggingService,
        {
          provide: ErrorHandler,
          useClass: ErrorHandlingService,
          deps: [ConfigurationService, LoggingService],
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeLogWriter,
          deps: [LoggingService, ConsoleWriter, LogglyWriter],
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
        NotificationService,
      ],
    };
  }
}
