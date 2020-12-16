import { HttpRequestMethod, HttpService } from '@valencia/http-service';
import { LoggingService, Severity } from '@valencia/logging';

import { ConfigurationService } from '@valencia/configuration';
import { IHttpStateRepositoryService } from './i-http-state-repository.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceBase } from '@valencia/foundation';

@Injectable({
  providedIn: 'root',
})
export class HttpStateRepositoryService extends ServiceBase implements IHttpStateRepositoryService {
  constructor(private httpService: HttpService, private configService: ConfigurationService, loggingService: LoggingService) {
    super('HttpStateRepositoryService', loggingService);
  }

  // performState<T>(someInput: string): Observable<any> {
  //   const requestUrl = `${this.configService.settings.appConfig.apiURL}VerifyMonitoredTerm`;
  //   this.loggingService.log(this.serviceName, Severity.Information, `Preparing to call API to... `);
  //   const options = this.httpService.createOptions(HttpRequestMethod.post, this.httpService.createHeader(), requestUrl, someInput, false);
  //   return this.httpService.execute(options);
  // }
}
