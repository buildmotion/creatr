import { HttpClient, HttpHandler } from '@angular/common/http';

import { BusinessProviderService } from './business/business-provider.service';
import { LoggingService } from '@valencia/logging';
import { Notification } from './models/notification.model';
import { NotificationService } from './notification.service';
import { NotificationSeverity } from './models/notification-severity.enum';
import { NotifierType } from './models/notifier-type.enum';
import { ServiceContext } from '@valencia/rules-engine';
import { TestBed } from '@angular/core/testing';

/**
 * Use to test the [Notification] service library API.
 * TDD for a specific item:  * yarn test --test-file=notification.service.spec.ts --project=notification --watch
 */
describe('NotificationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LoggingService, HttpClient, HttpHandler, BusinessProviderService, NotificationService],
    })
  );

  it('should be created', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).toBeTruthy();
  });

  it('should not be null', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service).not.toBeNull();
  });

  it('should have a valid ServiceContext', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    const message = new Notification('Errors Happen', 'An unfortunate error happened today.', NotifierType.Snackbar, NotificationSeverity.error, [
      'help me',
      'please',
    ]);
    service.serviceContext = new ServiceContext();
    service.addMessage(message);
    expect(service.serviceContext).not.toBeNull();
  });

  it('should contain a valid [BusinessProvider]', () => {
    const businessProvider: BusinessProviderService = TestBed.get(BusinessProviderService);
    expect(businessProvider).not.toBeNull();
  });

  it('should contain a valid [ServiceContext]', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    expect(service.serviceContext).not.toBeNull();
  });

  it('should contain a ServiceContext that [is good]', () => {
    const service: NotificationService = TestBed.get(NotificationService);
    const message = new Notification('Errors Happen', 'An unfortunate error happened today.', NotifierType.Banner, null, ['help me', 'please']);
    service.addMessage(message);
    expect(service.serviceContext.isGood).toBeTruthy();
  });
});
