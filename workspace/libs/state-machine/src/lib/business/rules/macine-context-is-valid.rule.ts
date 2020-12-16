import { CompositeRule, GuidIsValid, IsNotNullOrUndefined, IsTrue, RuleResult, StringIsNotNullEmptyRange } from '@valencia/rules-engine';

import { MachineContext } from '../../machine-context';

/**
 * Use this rule to validate a string target. A valid string is not null or undefined; and it
 * is within the specified minimum and maximum length.
 */
export class MachineContextIsValidRule extends CompositeRule {
  /**
   * Use to provide the target [Primitive] to evaluate for the specified rule.
   */
  target: MachineContext<any>;

  /**
   * The constructor for the [StringIsNotNullEmptyRangeRule].
   * @param name The name of the rule.
   * @param message The message to display when the rule is violated.
   * @param target The target that the rule(s) will be evaluated against.
   * @param minLength The minimum allowed length of the target value.
   * @param maxLength The maximum allowed length of the target value.
   */
  constructor(name: string, message: string, target: MachineContext<any>, isDisplayable: boolean = false) {
    super(name, message, isDisplayable);
    this.target = target;
    this.configureRules();
  }

  /**
   * A helper method to configure/add rules to the validation context.
   */

  configureRules() {
    this.rules.push(new IsNotNullOrUndefined('MachineContextIsNotNull', 'The machine context is null or undefined.', this.target));

    if (this.target != null) {
      this.rules.push(new GuidIsValid('MachineContextIdIsValid', 'The id value is not valid. Must be GUID.', this.target.id, true));
      this.rules.push(
        new StringIsNotNullEmptyRange(
          'MachineContextNameIsValid',
          'The machine context must have a valid name - between 1 and 100 characters.',
          this.target.name,
          1,
          100,
          true
        )
      );
      this.rules.push(
        new StringIsNotNullEmptyRange(
          'MachineContextInitialSateIsValid',
          'The machine context must have a valid initial state name - between 1 and 100 characters.',
          this.target.name,
          1,
          100,
          true
        )
      );
      this.rules.push(
        new IsTrue(
          'MachineContextHasStates',
          'The machine context must have at least one state item.',
          this.target.states && this.target.states.length > 0,
          true
        )
      );
    }
  }
}
