import { IConfiguration } from '@valencia/configuration';

export const AppConfig: IConfiguration = {
  contentful: {
    spaceId: '1234',
    token: '12341234',
  },
  loggingConfig: {
    applicationName: 'creatr',
    isProduction: false,
  },
  errorHandlingConfig: {
    applicationName: 'creatr',
    includeDefaultErrorHandling: true,
  },
  logglyConfig: {
    applicationName: 'creatr',
    apiKey: '7b8457fa-6c24-441d-b25d-901ec5280402',
    sendConsoleErrors: true,
  },
  webConfig: {
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
  },
};
