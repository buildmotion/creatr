import { ActionBase } from '@valencia/foundation';
import { ApiResponse } from '@valencia/common';
import { BusinessProviderService } from './business-provider.service';
import { LoggingService } from '@valencia/logging';
import { Observable } from 'rxjs';

/**
 * A helper class to provide the action with any dependencies and
 * starting the execution of the action life-cycle pipeline.
 */
export abstract class BusinessActionBase<T> extends ActionBase<T> {
  displayToUser = true;
  doNotDisplayToUser = false;
  businessProvider: BusinessProviderService;
  loggingService: LoggingService;
  public response: Observable<ApiResponse<T>>;

  constructor(actionName: string) {
    super();
    this.actionName = actionName;
  }

  /**
   * Use the [Do] method to perform the action. Also uses [inversion of control]
   * and provides the action the same instance of the [service context] and
   * [logging service].
   */
  Do(businessProvider: BusinessProviderService) {
    this.businessProvider = businessProvider;
    this.serviceContext = businessProvider.serviceContext;
    this.loggingService = businessProvider.loggingService;

    this.execute();
  }
}
