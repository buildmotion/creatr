import { of } from 'rxjs';

import { BusinessActionBase } from './business-action-base';
import { Notification } from '../models/notification.model';
import { IsNotNullOrUndefined, StringIsNotNullEmptyRange } from '@valencia/rules-engine';
import { ApiResponse } from '@valencia/common';
import { ActionResult } from '@valencia/actions';

export class ValidateNotificationAction<T extends Notification> extends BusinessActionBase<T> {
  notification: Notification;

  /**
   * Use the constructor to provide any required inputs for the action.
   */
  constructor(notification: Notification) {
    super('ValidateNotificationAction');
    this.notification = notification;
  }

  /**
   * Use this pipeline method as an opportunity to
   * setup the action for processing, validating business rules, and/or
   * performing other data validation.
   *
   * This method runs before [validationAction] and [performAction].
   */
  preValidateAction() {
    // this.validationContext.addRule(new FormMessageIsValidRule('FormMessageIsValid', 'The form message is not valid.', this.formMessage, true));

    this.validationContext
      .addRule(new IsNotNullOrUndefined('FormMessageIsNotNull', 'The form message cannot be null or undefined.', this.notification, this.doNotDisplayToUser))
      .addRule(
        new StringIsNotNullEmptyRange(
          'MessageTitleIsValid',
          'The message title is not valid. Must be within 2 and 45 characters.',
          this.notification.title,
          2,
          45,
          this.doNotDisplayToUser
        )
      )
      .addRule(
        new StringIsNotNullEmptyRange(
          'MessageDescriptionIsValid',
          'The message description is not valid. Must be within 1 and 200 characters.',
          this.notification.description,
          1,
          200,
          this.doNotDisplayToUser
        )
      )
      .addRule(new IsNotNullOrUndefined('NotifierTypeIsValid', 'The notifier type is not valid.', this.notification.notifierType, this.doNotDisplayToUser));

    this.notification.messages.forEach((item) => {
      this.validationContext.addRule(
        new StringIsNotNullEmptyRange('MessageIsValid', 'The message item is not valid. Must be within 2 and 125 characters.', item, 2, 125)
      );
    });
  }

  /**
   * Use this method to implement the action's business logic. This
   * method will execute if there are no validation or business rule violations.
   *
   * Wraps the response in an ApiResponse to return the value using the action's [response] property.
   */
  performAction() {
    this.actionResult = ActionResult.Success;

    const successApiMessage = new ApiResponse<T>();
    successApiMessage.isSuccess = true;
    successApiMessage.data = <T>this.notification;
    //TODO: ADD/CONFIGURE CODE FOR DISPLAY MESSAGE;
    // successApiMessage.Message = 'Successfully validated the notification message.';

    this.response = of(successApiMessage);
  }
}
