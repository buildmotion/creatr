import { ApiMessage, ApiResponse } from '@valencia/common';

import { Injectable } from '@angular/core';
import { LoggingService } from '@valencia/logging';
import { Notification } from '../models/notification.model';
import { Observable } from 'rxjs';
import { ServiceBase } from '@valencia/foundation';
import { ValidateApiResponseAction } from './validate-api-response-action';
import { ValidateNotificationAction } from './validate-notification-action';

@Injectable({
  // providedIn: 'root'
  providedIn: 'root',
})
export class BusinessProviderService extends ServiceBase {
  constructor(logger: LoggingService) {
    super('NotificationService.BusinessProviderService', logger);
  }

  /**
   * Use to execute one or more actions to process the business operation.
   * @param message a message to display form information to a user.
   */
  validateNotification<T extends Notification>(message: Notification): Observable<ApiResponse<T>> {
    const action = new ValidateNotificationAction<T>(message);
    action.Do(this);
    return action.response;
  }

  validateApiResponse<T>(apiResponse: ApiResponse<T>): Observable<ApiResponse<T>> {
    const action = new ValidateApiResponseAction<T>(apiResponse);
    action.Do(this);
    return action.response;
  }
}
