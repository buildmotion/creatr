import { BusinessActionBase } from './business-action-base';
import { MachineContext } from '../../machine-context';
import { MachineContextIsValidRule } from '../rules/macine-context-is-valid.rule';
import { Severity } from '@valencia/logging';
import { State } from '../../state';
import { StringIsNotNullEmptyRange } from '@valencia/rules-engine';

/**
 * Use this action to perform business logic with validation and business rules.
 */
export class RetrieveTransitionTargetStateAction<T> extends BusinessActionBase<T> {
  constructor(private eventName: string, private machineContext: MachineContext<any>, private targetState: State<any>) {
    super('RetrieveTransitionTargetStateAction');
  }

  /**
   * Use the [preValidateAction] to add any business or validation rules that
   * are required to pass in order to perform the action.
   *
   * Use the [ValidationContext] item of the action to add rules. The ValidationContext
   * uses a Fluent API to allow for chained rules to be configured.
   */
  preValidateAction() {
    this.validationContext.addRule(
      new StringIsNotNullEmptyRange(
        'EventNameIsValid',
        'The event name is not valid. Unable to find event.',
        this.eventName,
        1,
        Number.MAX_SAFE_INTEGER,
        this.showRuleMessages
      )
    );

    this.validationContext.addRule(
      new MachineContextIsValidRule('MachineContextIsValid', 'The machine context is not valid.', this.machineContext, this.showRuleMessages)
    );
  }

  /**
   * Use the [performAction] operation to execute the target of the action's business logic. This
   * will only run if the rules and validations are successful.
   */
  performAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to .`);
    const currentEvent = this.targetState.events.find((e) => e.name === this.eventName);
    if (currentEvent && currentEvent.target) {
      const targetState = this.machineContext.states.find((s) => s.context === currentEvent.target);
      this.response = this.businessProvider.createSuccessResponse(targetState, 'Successfully selected target event with state.');
    }
  }
}
