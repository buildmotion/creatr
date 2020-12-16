import { IConfiguration } from '../i-configuration';
import { IContentfulConfig } from '../config/i-contentful-config';
import { IErrorHandingConfig } from '../config/i-error-handling-config';
import { ILoggingConfig } from '../config/i-logging-config';
import { ILogglyConfig } from '../config/i-loggly-config';
import { IWebConfig } from '../config/i-web-config';

export class AppConfigMock implements IConfiguration {
  contentful: IContentfulConfig = {
    spaceId: '1234',
    token: '12341234',
  };
  loggingConfig: ILoggingConfig = {
    applicationName: 'creatr',
    isProduction: false,
  };
  errorHandlingConfig: IErrorHandingConfig = {
    applicationName: 'creatr',
    includeDefaultErrorHandling: true,
  };
  logglyConfig: ILogglyConfig = {
    applicationName: 'creatr',
    apiKey: '7b8457fa-6c24-441d-b25d-901ec5280402',
    sendConsoleErrors: true,
  };
  webConfig: IWebConfig = {
    applicationName: 'creatr',
    companyName: 'Creatr',
    companyEffectiveDate: new Date(2020, 10, 1),
    version: '1.0.0',
    social: {
      github: { name: 'Angular Workspace (course repository)', URL: 'https://gitlab.com/angular-architecture/angular-workspace' },
      instagram: { name: 'AngularArchitecture', URL: 'https://www.instagram.com/AngularArchitecture/' },
      twitter: { name: '@AngularArch', URL: 'https://twitter.com/AngularArch' },
    },
    email: 'creatr@buildmotion.com',
    website: 'Creatr',
    blogURL: 'https://www.medium.com/@angularlicious',
  };
}
