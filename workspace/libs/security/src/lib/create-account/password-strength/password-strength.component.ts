import { Component, Input, OnInit } from '@angular/core';

import { ComponentBase } from '@valencia/foundation';
import { LoggingService } from '@valencia/logging';
import { Router } from '@angular/router';

/**
 * These are the classes that will need to be added and or toggled to
 * the parent article element with the class .bt-password-strength.
 *
 * On [keyup] once conditions have been met, add these classes to article.bt-password-strength:
 *
 *    - 8 Characters have been reached: .has-eight-char
 *    - 1 Uppercase letter entered: .has-upper
 *    - 1 Lowercase letter entered: .has-lower
 *    - 1 Number entered: .has-number
 *    - 1 Special character: .has-special
 *
 * Once 1 condition has been met add this class to article.bt-password-strength: .is-weak
 * Once 3 conditions have been met, replace .is-weak with .is-med
 * Once all conditions have been met, replace .is-med with .is-strong
 *
 * When a user focuses away [OnBlur] from the password field without reaching the proper criteria, remove the classes from the previous list, and replace with these classes respectively:
 *
 *     - 8 Characters have NOT been reached: .without-eight-char
 *     - 1 Uppercase letter NOT entered: .without-upper
 *     - 1 Lowercase letter NOT entered: .without-lower
 *     - 1 Number NOT entered: .without-number
 *     - 1 Special NOT character: .without-special
 */
@Component({
  selector: 'buildmotion-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent extends ComponentBase implements OnInit {
  @Input() hasEightChars: boolean;
  @Input() hasLowercase: boolean;
  @Input() hasNumber: boolean;
  @Input() hasSpecialChar: boolean;
  @Input() hasUppercase: boolean;
  @Input() isMedium: boolean;
  @Input() isStrong: boolean;
  @Input() isWeak: boolean;
  @Input() withoutEightChars: boolean;
  @Input() withoutLowercase: boolean;
  @Input() withoutNumber: boolean;
  @Input() withoutSpecialChar: boolean;
  @Input() withoutUppercase: boolean;

  constructor(loggingService: LoggingService, router: Router) {
    super('PasswordStrengthComponent', loggingService, router);
  }

  ngOnInit() {}
}
