import { ReplaySubject, Subject } from 'rxjs';

import { AppConfigMock } from './app-config.mock';
import { IConfiguration } from '../i-configuration';
import { IConfigurationService } from '../configuration.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationServiceMock implements IConfigurationService {
  settings$: Subject<IConfiguration> = new ReplaySubject<IConfiguration>(1);
  private config: IConfiguration = new AppConfigMock();

  set settings(value: IConfiguration) {
    this.config = value;
    if (this.config) {
      console.log(`Initializing configuration for Configuration Service.`);
      this.settings$.next(this.config);
    } else {
      console.error(`Failed to initialize configuration for Configuration Service.`);
    }
  }

  get settings(): IConfiguration {
    return this.config;
  }
}
