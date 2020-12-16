import { IConfiguration } from '@valencia/configuration';
import { ILogglyConfig } from './i-loggly-config';

export class LogglyConfig implements ILogglyConfig {
  applicationName: string;
  apiKey: string;
  sendConsoleErrors: boolean;
}
