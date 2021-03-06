import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { Notification } from './models/notification.model';
import { LoggingService, Severity } from '@valencia/logging';
import { SingletonServiceBase } from '@valencia/foundation';
import { ApiResponse, ApiMessage } from '@valencia/common';
import { BusinessProviderService } from './business/business-provider.service';
import { NotificationOptions } from '@valencia/notification';

/**
 * The NotificationService is used to manage the publishing of notifications
 * messages for an application. This service will publish notifications, however,
 * the application will require a subscription or a notifier that will handle new
 * published notifications for display.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService extends SingletonServiceBase {
  private notificationsSubject$: ReplaySubject<Notification> = new ReplaySubject<Notification>(1);
  public readonly notifications$: Observable<Notification> = this.notificationsSubject$.asObservable();

  private apiMessagesSubject: ReplaySubject<ApiMessage[]> = new ReplaySubject<ApiMessage[]>(1);
  public readonly apiMessages$: Observable<ApiMessage[]> = this.apiMessagesSubject.asObservable();

  private addMessageSubscription: Subscription;
  private addApiResponseSubscription: Subscription;

  constructor(logger: LoggingService, private businessProvider: BusinessProviderService) {
    super(NotificationService, logger, 'NotificationService');
  }

  /**
   * Use to publish a new API error message.
   * @param apiResponse
   */
  addApiResponse<T>(apiResponse: ApiResponse<T>) {
    this.addApiResponseSubscription = this.businessProvider.validateApiResponse<T>(apiResponse).subscribe(
      (response) => this.handleAddApiResponse<T>(response),
      (error) => this.handleServiceErrors(error),
      () => this.finishAddApiRequest()
    );
  }

  /**
   * Use to add a new [Notification] to the service. Valid notifications
   * are published to all subscribers (for display).
   */
  addMessage(message: Notification, options?: NotificationOptions): void {
    this.addMessageSubscription = this.businessProvider.validateNotification<Notification>(message).subscribe(
      (response) => this.handleAddMessage<Notification>(response, options),
      (error) => this.handleServiceErrors(error),
      () => this.finishAddMessageRequest()
    );
  }

  /**
   * Use to reset the notification service - removes all messages.
   */
  reset() {
    this.notificationsSubject$.next(null);
    this.apiMessagesSubject.next(null);
  }

  /**
   * Use to handle the validation response for an API that contains
   * error response messages to publish.
   * @param response
   */
  private handleAddApiResponse<T>(response: ApiResponse<T>): void {
    if (response instanceof ApiResponse) {
      if (response.isSuccess && response instanceof ApiResponse) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to notify [API Message] subscribers.`);
        this.apiMessagesSubject.next(<any>response.data);
      } else if (!response.isSuccess && response instanceof ApiResponse) {
        this.handleServiceErrors(response);
      }
    }
  }

  /**
   * Use to handle the response of a notification validation.
   * @param response an ApiResponse<Notification> where the [Data] payload is of type [Notification]
   *
   */
  private handleAddMessage<T extends Notification>(response: ApiResponse<T>, options?: NotificationOptions) {
    if (response instanceof ApiResponse) {
      if (response.isSuccess && response instanceof ApiResponse) {
        const message: Notification = response.data;
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to notify notification subscribers of new message: ${message.title}`);

        if (message instanceof Notification && options) {
          message.options = options;
        }
        this.notificationsSubject$.next(message);
      } else if (!response.isSuccess && response instanceof ApiResponse) {
        this.handleServiceErrors(response);
      }
    }
  }

  handleServiceErrors(response: any) {
    this.loggingService.log(this.serviceName, Severity.Error, `Failed to process notification message. ${response}`);
  }

  /**
   * Use to manage the subscription for processing a new notification message.
   */
  private finishAddMessageRequest(): void {
    this.finishRequest(this.serviceName);
    if (this.addMessageSubscription) {
      this.addMessageSubscription.unsubscribe();
    }
  }

  /**
   * Use to finish processing API messages.
   * @param serviceName
   */
  private finishAddApiRequest(): void {
    this.finishRequest(this.serviceName);
    if (this.addApiResponseSubscription) {
      this.addApiResponseSubscription.unsubscribe();
    }
  }
}
