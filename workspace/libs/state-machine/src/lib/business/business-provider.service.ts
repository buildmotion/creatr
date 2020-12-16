import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ConfigurationService } from '@valencia/configuration';
import { LoggingService } from '@valencia/logging';
import { ServiceBase } from '@valencia/foundation';
import { ApiMessage, ApiResponse } from '@valencia/common';
import { HttpStateRepositoryService } from './http-state-repository.service';
import { IBusinessProviderService } from './i-business-provider.service';
import { MachineContext } from '../machine-context';
import { State } from '../state';
import { RetrieveInitialStateAction } from './actions/retrieve-initial-state.action';
import { RetrieveTransitionTargetStateAction } from './actions/retrieve-transition-target-state.action';

@Injectable({
  providedIn: 'root',
})
export class BusinessProviderService extends ServiceBase implements IBusinessProviderService {
  constructor(
    @Inject(HttpStateRepositoryService) public apiService: HttpStateRepositoryService,
    public configService: ConfigurationService,
    loggingService: LoggingService
  ) {
    super('BusinessProviderService', loggingService);
  }

  // someMethod<T>(someInput: string): Observable<ApiResponse<T>> {
  //   const action = new SomeAction<T>(someInput);
  //   action.Do(this);
  //   return action.response;
  // }

  createSuccessResponse<T>(data: any, message?: string): Observable<ApiResponse<T>> {
    const apiResponse = new ApiResponse<T>();
    apiResponse.isSuccess = true;
    apiResponse.data = data;
    apiResponse.message = message ? message : `Successfully processed request.`;

    return of(apiResponse);
  }

  // createFailResponse<T>(data: any, messages?: ApiMessage[], message?: string): Observable<ApiResponse<T>> {}

  retrieveInitialState<T>(machineContext: MachineContext<any>): Observable<ApiResponse<T>> {
    const action = new RetrieveInitialStateAction<T>(machineContext);
    action.Do(this);
    return action.response;
  }

  retrieveTransitionTargetState<T>($event: string, context: MachineContext<any>, currentState: State<any>): Observable<ApiResponse<T>> {
    const action = new RetrieveTransitionTargetStateAction<T>($event, context, currentState);
    action.Do(this);
    return action.response;
  }
}
