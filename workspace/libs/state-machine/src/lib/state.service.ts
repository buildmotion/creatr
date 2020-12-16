import { Injectable, Inject } from '@angular/core';
import { ApiResponse } from '@valencia/common';

import { ServiceBase } from '@valencia/foundation';
import { LoggingService, Severity } from '@valencia/logging';
import { BehaviorSubject, Observable } from 'rxjs';
import { BusinessProviderService } from './business/business-provider.service';
import { MachineContext } from './machine-context';
import { State } from './state';

@Injectable({
  providedIn: 'root',
})
export class StateService extends ServiceBase {
  private currentState: State<any>;

  private currentStateSubject: BehaviorSubject<State<any>> = new BehaviorSubject<State<any>>(null);
  private transitionSubject: BehaviorSubject<State<any>> = new BehaviorSubject<State<any>>(null);

  public readonly currentState$: Observable<State<any>> = this.currentStateSubject.asObservable();
  public readonly transition$: Observable<State<any>> = this.transitionSubject.asObservable();
  context: MachineContext<any>;

  constructor(@Inject(BusinessProviderService) private businessProvider: BusinessProviderService, loggingService: LoggingService) {
    super('StateService', loggingService);
    this.businessProvider.serviceContext = this.serviceContext;
  }

  create<T>(machineContext: MachineContext<T>) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to create state-machine context.`);
    this.context = machineContext;
    this.retrieveInitialState();
  }

  retrieveInitialState(): void {
    this.businessProvider.retrieveInitialState<State<any>>(this.context).subscribe(
      (response) => this.handleRetrieveInitialState(response),
      (error) => this.handleRetrieveInitialStateError(error),
      () => this.finishRetrieveInitialState()
    );
  }

  transition(eventName: string) {
    this.businessProvider.retrieveTransitionTargetState<State<any>>(eventName, this.context, this.currentState).subscribe(
      (response) => this.handleRetrieveTransitionState(response),
      (error) => this.handleRetrieveTransitionStateError(error),
      () => this.finishRetrieveTransitionState()
    );
  }

  private handleRetrieveTransitionState(response: ApiResponse<State<any>>): void {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process API response for [retrieving transition state]`);
    if (response) {
      if (response.isSuccess && response.data) {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process [successful] API response`);
        this.transitionSubject.next(this.currentState);
        this.setCurrentState(response);
      } else {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process [unsuccessful] API response`);
      }
    }
  }

  private handleRetrieveTransitionStateError(error: any): void {
    this.handleError(error);
  }

  private finishRetrieveTransitionState(): void {
    this.loggingService.log(
      this.serviceName,
      Severity.Information,
      `Finished processing request to retrieve transition state. Current state is: ${this.currentState.name}`
    );
  }

  private finishRetrieveInitialState(): void {
    this.loggingService.log(this.serviceName, Severity.Information, `Finished processing request for the initial state.`);
  }

  private handleRetrieveInitialStateError(error: any): void {
    this.logError(error, 'Error while attempting to retrieve initial state.');
  }

  private handleRetrieveInitialState(response: ApiResponse<State<any>>) {
    this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process API response for [initial state]`);
    if (response) {
      if (response.isSuccess) {
        this.setCurrentState(response);
        this.loggingService.log(this.serviceName, Severity.Information, `Loading initial state: ${this.currentStateSubject.value.name}.`);
      } else {
        this.loggingService.log(this.serviceName, Severity.Information, `Preparing to process [unsuccessful] API response`);
      }
    }
  }

  private setCurrentState(response: ApiResponse<State<any>>) {
    this.currentState = response.data;
    this.currentStateSubject.next(this.currentState);
  }
}
