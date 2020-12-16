import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LoggingService, Severity } from '@valencia/logging';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ComponentBase } from '@valencia/foundation';
import { CreateAccountUIService } from './create-account-ui.service';
import { Router } from '@angular/router';
import { ValidationService } from '@valencia/validation';

export function passwordMatchValidator(g: FormGroup) {
  return g.get('password').value === g.get('passwordConfirm').value
    ? null
    : {
        passwordMismatch: true,
      };
}

@Component({
  selector: 'buildmotion-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent extends ComponentBase implements OnInit {
  private submittedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly hasErrors$: Observable<boolean> = this.uiService.hasErrors$;
  public readonly isAccountCreated$: Observable<boolean> = this.uiService.isAccountCreated$;
  public readonly isProcessingAccount$: Observable<boolean> = this.uiService.isProcessingAccount$;
  public readonly submitted$: Observable<boolean> = this.submittedSubject.asObservable();

  createAccountForm: FormGroup;

  // inputs for the [PasswordStrength] indicator
  hasEightChars: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChars: boolean;
  hasUppercase: boolean;
  isMedium: boolean;
  isStrong: boolean;
  isWeak: boolean;
  withoutEightChars: boolean;
  withoutLowercase: boolean;
  withoutNumber: boolean;
  withoutSpecialChar: boolean;
  withoutUppercase: boolean;
  strength: number;

  // shared password validators;
  private passwordValidators = [Validators.required, Validators.minLength(8), Validators.maxLength(128)];

  constructor(
    private validationService: ValidationService,
    private formBuilder: FormBuilder,
    private uiService: CreateAccountUIService,
    loggingService: LoggingService,
    router: Router
  ) {
    super('CreateAccountComponent', loggingService, router);
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  checkStrengthOnFocus(passwordInput: any) {
    // passwordInput.srcElement.value
    this.determinePasswordStrength(passwordInput.srcElement.value);
  }

  checkStrengthOnBlur() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to check strength of`);
    if (!this.isStrong) {
      if (!this.hasEightChars) {
        this.withoutEightChars = true;
      }

      if (!this.hasLowercase) {
        this.withoutLowercase = true;
      }

      if (!this.hasNumber) {
        this.withoutNumber = true;
      }

      if (!this.hasSpecialChars) {
        this.withoutSpecialChar = true;
      }

      if (!this.hasUppercase) {
        this.withoutUppercase = true;
      }
    }
  }

  forgotPassword() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to navigate to [forgot password].`);
    this.routeTo('/security/forgot-password');
  }

  initializeForm() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to initialize the create account form.`);
    this.createAccountForm = this.formBuilder.group({
      emailAddress: new FormControl(undefined, {
        validators: [Validators.required, Validators.maxLength(100)],
        asyncValidators: [
          // ADD ASYNC EMAIL VALIDATION HERE;
        ],
        updateOn: 'blur',
      }),
      password: new FormControl(undefined, {
        validators: [...this.passwordValidators],
        asyncValidators: [
          // ADD PasswordStrength VALIDATION VIA SERVICE HERE
        ],
      }),
      passwordConfirm: new FormControl(undefined, {
        // validators: [...this.passwordValidators],
        updateOn: 'change',
      }),
    });

    this.onPasswordValueChange();
  }

  login() {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to navigate to [login].`);
    this.routeTo('/security/login');
  }

  onSubmit(): void {
    this.loggingService.log(this.componentName, Severity.Information, `Preparing to process form submission.`);
    this.validatePasswordsMatch();
    this.markFormAsTouched(this.createAccountForm);

    if (this.createAccountForm.valid) {
      // retrieve data elements for request;
      const emailAddress = this.createAccountForm.get('emailAddress');
      const password = this.createAccountForm.get('password');
      const passwordConfirm = this.createAccountForm.get('passwordConfirm');

      // call adaptor service
      this.loggingService.log(this.componentName, Severity.Information, `Simulate [create account]...`);
      // this.uiService.createAccount(emailAddress.value, password.value, passwordConfirm.value);

      this.submittedSubject.next(true);
      this.loggingService.log(this.componentName, Severity.Information, `Preparing to process the create account form submission.`);
    } else {
      this.loggingService.log(this.componentName, Severity.Warning, `The create account form is not valid.`);

      // reset password confirmation input;
      // this.passwordConfirm.setErrors(null);
      this.passwordConfirm.setValidators(null);
    }
  }

  /**
   * Use to reset the password strength indicator elements.
   */
  private resetStrengthIndicators() {
    this.hasEightChars = false;
    this.hasLowercase = false;
    this.hasNumber = false;
    this.hasSpecialChars = false;
    this.hasUppercase = false;

    this.isMedium = false;
    this.isStrong = false;
    this.isWeak = false;

    this.withoutEightChars = false;
    this.withoutLowercase = false;
    this.withoutNumber = false;
    this.withoutSpecialChar = false;
    this.withoutUppercase = false;
  }

  /**
   * Use to determine the strength of the password.
   *
   * Once 1 condition has been met add this class to article.bt-password-strength:
   *   - .is-weak
   *   - Once 3 conditions have been met, replace .is-weak with .is-med
   *   - Once all conditions have been met, replace .is-med with .is-strong
   *
   * @param password
   */
  private determinePasswordStrength(password: string) {
    this.strength = [
      this.validatePasswordUppercase(password),
      this.validatePasswordLowercase(password),
      this.validatePasswordNumeric(password),
      this.validatePasswordSpecialCharacter(password),
      this.validatePasswordMinLength(password),
    ].filter((item) => item !== false).length;

    this.loggingService.log(this.componentName, Severity.Information, `Preparing to set password strength: ${this.strength}`);

    this.isWeak = false;
    this.isMedium = false;
    this.isStrong = false;

    if (this.strength === 5) {
      this.isWeak = true;
      this.isMedium = true;
      this.isStrong = true;
    }
    if (this.strength >= 3) {
      this.isWeak = true;
      this.isMedium = true;
    }
    if (this.strength >= 1 && this.strength < 3) {
      this.isWeak = true;
    }
    if (this.strength < 1) {
      this.isWeak = false;
      this.isMedium = false;
      this.isStrong = false;
    }
  }

  private validatePasswordConfirmMatch(form: FormGroup, passMatch) {
    if (!passwordMatchValidator(form)) {
    } else {
      this.passwordConfirm.setErrors({
        passwordMismatch: true,
      });
    }
  }

  private onPasswordValueChange() {
    this.passwordConfirm.valueChanges.pipe(debounceTime(1), distinctUntilChanged()).subscribe((value) => {
      this.passwordConfirm.setErrors(null);
    });

    this.password.valueChanges.pipe(debounceTime(150)).subscribe(() => {
      if (this.password.value === '') {
        this.resetStrengthIndicators();
      } else {
        this.determinePasswordStrength(this.password.value);
      }
    });
  }

  private passwordsMatchValidator(passwordConfirm: FormControl) {
    return this.validationService.PasswordsMatch(passwordConfirm, this.password);
  }

  private validatePasswordLowercase(value: any): boolean {
    const isValid = this.validationService.hasLowercase(value);
    this.hasLowercase = isValid;
    if (this.withoutLowercase && isValid) {
      this.withoutLowercase = false;
    }
    return isValid;
  }

  private validatePasswordMinLength(value: any): boolean {
    const isValid = this.validationService.StringMinLengthIsValid(value, 8);
    this.hasEightChars = isValid;
    if (this.withoutEightChars && isValid) {
      this.withoutEightChars = false;
    }
    return isValid;
  }

  private validatePasswordNumeric(value: any): boolean {
    const isValid = this.validationService.hasNumber(value);
    this.hasNumber = isValid;
    if (this.withoutNumber && isValid) {
      this.withoutNumber = false;
    }
    return isValid;
  }

  /**
   * Use to set validators and errors for matching passwords.
   */
  private validatePasswordsMatch() {
    this.passwordConfirm.setValidators([...this.passwordValidators]);
    this.passwordConfirm.updateValueAndValidity();
    this.validatePasswordConfirmMatch(this.createAccountForm, this.passwordConfirm);
  }

  private validatePasswordSpecialCharacter(value: any): boolean {
    const isValid = this.validationService.hasSpecialCharacters(value);
    this.hasSpecialChars = isValid;
    if (this.withoutSpecialChar && isValid) {
      this.withoutSpecialChar = false;
    }
    return isValid;
  }

  private validatePasswordUppercase(value: string): boolean {
    const isValid = this.validationService.hasUppercase(value);
    this.hasUppercase = isValid;
    if (this.withoutUppercase && isValid) {
      this.withoutUppercase = false;
    }
    return isValid;
  }

  get emailAddress(): AbstractControl {
    return this.createAccountForm.get('emailAddress') as FormControl;
  }

  get passwordConfirm(): AbstractControl {
    return this.createAccountForm.get('passwordConfirm') as FormControl;
  }

  get password(): AbstractControl {
    return this.createAccountForm.get('password') as FormControl;
  }
}
