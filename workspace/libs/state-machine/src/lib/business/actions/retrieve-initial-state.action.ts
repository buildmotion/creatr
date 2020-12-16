import { IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@valencia/rules-engine';

import { BusinessActionBase } from './business-action-base';
import { MachineContext } from '../../machine-context';
import { Severity } from '@valencia/logging';
import { State } from '../../state';
import { of } from 'rxjs';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class RetrieveInitialStateAction<T> extends BusinessActionBase<T> {
  initialState: State<T>;
  constructor(private machineContext: MachineContext<any>) {
    super('RetrieveInitialStateAction');
  }

  /**
   * Use the [preValidateAction] to add any business or validation rules that
   * are required to pass in order to perform the action.
   *
   * Use the [ValidationContext] item of the action to add rules. The ValidationContext
   * uses a Fluent API to allow for chained rules to be configured.
   */
  preValidateAction() {
    this.initialState = this.machineContext.states.find((s) => s.name === this.machineContext.initialState);

    this.validationContext.addRule(
      new IsNotNullOrUndefined('InitialStateIsValid', 'Failed to find initial state in the state machine context.', this.initialState, true)
    );
  }

  /**
   * Use the [performAction] operation to execute the target of the action's business logic. This
   * will only run if the rules and validations are successful.
   */
  performAction() {
    const message = `Successfully retrieved initial state from machine context.`;
    this.loggingService.log(this.actionName, Severity.Information, message);
    this.response = this.businessProvider.createSuccessResponse(this.initialState, `Successfully retrieved initial state from machine context.`);
  }
}
