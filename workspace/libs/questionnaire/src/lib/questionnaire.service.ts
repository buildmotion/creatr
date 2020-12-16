import { LoggingService, Severity } from '@valencia/logging';
import { State, StateService } from '@valencia/state-machine';

import { Injectable } from '@angular/core';
import { QConfigurationContext } from './configuration-context';
import { Router } from '@angular/router';
import { ServiceBase } from '@valencia/foundation';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService extends ServiceBase {
  public readonly currentState$ = this.stateService.currentState$;
  public readonly transition$ = this.stateService.transition$;

  private routePrefix: string;

  constructor(private stateService: StateService, private router: Router, private qContext: QConfigurationContext, loggingService: LoggingService) {
    super('QuestionnaireService', loggingService);
    this.loggingService.log(this.serviceName, Severity.Information, `Initializing service. Id: [${Math.random()}]`);
    this.init();
  }

  initializeQ(routePrefix?: string) {
    this.routePrefix = routePrefix;
    if (this.qContext && this.qContext.config) {
      this.loggingService.log(this.serviceName, Severity.Information, `Initializing q: ${this.qContext.config.name}/${this.qContext.config.id}`);
      this.stateService.create(this.qContext.config);

      // init and load initial state;
      this.stateService.retrieveInitialState();
    } else {
      this.loggingService.log(this.serviceName, Severity.Error, `The questionnaire does not contain a valid configuration.`);
    }
  }

  transition($event: any) {
    if ($event) {
      this.stateService.transition($event);
    }
  }

  private init() {
    this.currentState$.subscribe((response) => {
      if (response && response.context) {
        this.loadStateComponent(response);
      }
    });
  }

  private loadStateComponent(currentState: State<any>) {
    try {
      this.router.navigateByUrl(`${this.routePrefix}/${currentState.context}`);
    } catch (error) {
      this.handleError(error);
    }
  }
}
