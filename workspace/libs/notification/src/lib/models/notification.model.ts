import { NotificationOptions } from './notification-options.model';
import { NotificationSeverity } from './notification-severity.enum';
import { NotifierType } from './notifier-type.enum';

export class Notification {
  title: string;
  description: string;
  messages: string[] = [];
  severity?: NotificationSeverity;
  notifierType?: NotifierType;
  options?: NotificationOptions;

  constructor(title?: string, description?: string, notifierType?: NotifierType, severity?: NotificationSeverity, messages?: string[]);
  constructor(title: string, description?: string, notifierType?: NotifierType, severity?: NotificationSeverity, messages?: string[]);
  constructor(title: string, description: string, notifierType?: NotifierType, severity?: NotificationSeverity, messages?: string[]);
  constructor(title: string, description: string, notifierType: NotifierType, severity?: NotificationSeverity, messages?: string[]);
  constructor(title: string, description: string, notifierType: NotifierType, severity: NotificationSeverity, messages?: string[]);
  constructor(title: string, description: string, notifierType: NotifierType, severity: NotificationSeverity, messages: string[]) {
    this.title = title;
    this.description = description;
    this.messages = messages ? messages : [];
    this.severity = severity ? severity : NotificationSeverity.information;
    this.notifierType = notifierType ? notifierType : NotifierType.Unknown;
  }
}
