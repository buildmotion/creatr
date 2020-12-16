import { ApiMessage, ApiMessageType, ApiResponse } from '@valencia/common';
import { Observable, of, throwError } from 'rxjs';

import { Action } from '@valencia/actions';
import { ActionResult } from '@valencia/actions';
import { CompositeRule } from '@valencia/rules-engine';
import { ErrorResponse } from './models/error-response.model';
import { HttpBaseService } from './http-base.service';
import { LoggingService } from '@valencia/logging';
import { MessageType } from '@valencia/rules-engine';
import { RuleResult } from '@valencia/rules-engine';
import { ServiceContext } from '@valencia/rules-engine';
import { ServiceMessage } from '@valencia/rules-engine';
import { Severity } from '@valencia/logging';
import { ValidationContext } from '@valencia/rules-engine';

/**
 * This is the application's base Action class that provides implementation of pipeline methods - pre/post
 * execution methods.
 *
 * The pre-execute methods that can be implemented are:
 *		1. start();
 *		2. audit();
 *		3. preValidateAction();
 *		4. evaluateRules();
 *		5. postValidateAction();
 *		6. preExecuteAction();
 *
 *If the status of action is good, the business logic will be executed using the:
 *		1. processAction();
 *
 * The post-execution methods that can be implemented are:
 *		1. postExecuteAction();
 *		2. validateActionResult();
 *		3. finish();
 */

export abstract class ActionBase<T> extends Action {
  serviceContext: ServiceContext = new ServiceContext();
  response: Observable<any> | undefined;
  httpBase: HttpBaseService | undefined;
  loggingService!: LoggingService;
  actionName!: string;

  /**
   * This is a required implementation if you want to render/execute the rules that
   * are associated to the specified action.
   */
  validateAction(): ValidationContext {
    return this.validationContext.renderRules();
  }

  postValidateAction() {
    this.loggingService.log(this.actionName, Severity.Information, `Preparing to determine if the action contains validation errors in ${this.actionName}`);

    if (this.validationContext.hasRuleViolations()) {
      this.loggingService.log(this.actionName, Severity.Information, `The target contains validation errors in ${this.actionName}`);

      // Load the error/rule violations into the ServiceContext so that the information bubbles up to the caller of the service;
      this.validationContext.results.forEach((result) => {
        if (!result.isValid) {
          this.publishRuleResult(result);
          this.retrieveRuleDetails(result);
        }
      });

      this.createFailResponse();
    }
  }

  createFailResponse() {
    const apiResponse = new ApiResponse<T>();
    apiResponse.isSuccess = false;
    apiResponse.message = `Request failed.`;

    const messages = new Array<ApiMessage>();
    if (this.serviceContext.hasErrors && this.serviceContext.Messages.length > 0) {
      this.serviceContext.Messages.map((m) => {
        const error = new ApiMessage();
        error.message = m.Message;
        error.messageType = ApiMessageType.Error;
        error.code = m.Name;

        messages.push(error);
      });
    }
    apiResponse.messages = messages.length > 0 ? messages : [];
    return of(apiResponse);
  }

  postExecuteAction() {
    if (this.actionResult === ActionResult.Fail) {
      this.serviceContext.Messages.forEach((e) => {
        if (e.MessageType === MessageType.Error) {
          this.loggingService.log(this.actionName, Severity.Error, e.toString());
        }
      });
    }
  }

  /**
   * All concrete actions must override and implement this method. It is defined in the [Action] framework class.
   */
  validateActionResult(): ActionResult {
    this.loggingService.log(this.actionName, Severity.Information, `Running [validateActionResult] for ${this.actionName}.`);
    // determine the status of the action based on any rule violations;
    if (this.validationContext.hasRuleViolations()) {
      this.loggingService.log(this.actionName, Severity.Error, `The ${this.actionName} contains rule violations.`);
      this.actionResult = ActionResult.Fail;

      const errorResponse = new ErrorResponse();
      errorResponse.IsSuccess = false;
      errorResponse.Message = `Validation errors exist.`;
      this.response = throwError(errorResponse);
    }
    this.actionResult = this.serviceContext.isGood() ? ActionResult.Success : ActionResult.Fail;
    return this.actionResult;
  }

  /**
   * Use to process rule results for composite rules. Note, that this function is recursive
   * and will process all composite rules in the rule set contained in the ValidationContext.
   * @param ruleResult The result of a rendered rule.
   */
  retrieveRuleDetails(ruleResult: RuleResult) {
    if (ruleResult.rulePolicy instanceof CompositeRule) {
      const composite = ruleResult.rulePolicy as CompositeRule;
      if (composite && composite.hasErrors) {
        const errors = composite.results.filter((result) => !result.isValid && result.rulePolicy.isDisplayable);

        errors.forEach((errorResult) => {
          this.publishRuleResult(errorResult);

          if (errorResult.rulePolicy instanceof CompositeRule) {
            this.retrieveRuleDetails(errorResult);
          }
        });
      }
    }
  }

  /**
   * A helper function to publish a new [ServiceMessage] to the [ServiceContext.Messages] list.
   * @param ruleResult
   */
  publishRuleResult(ruleResult: RuleResult) {
    const serviceMessage = new ServiceMessage(ruleResult.rulePolicy.name, ruleResult.rulePolicy.message, MessageType.Error);
    serviceMessage.DisplayToUser = ruleResult.rulePolicy.isDisplayable;
    serviceMessage.Source = this.actionName;
    this.serviceContext.Messages.push(serviceMessage);
    this.loggingService.log(this.actionName, Severity.Error, `${serviceMessage.toString()}`);
  }
}
