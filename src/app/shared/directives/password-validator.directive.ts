import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true },
  ],
})
export class PasswordValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors {
    const password = control.get('password') ? control.get('password').value : null;
    const passwordAgain = control.get('passwordAgain') ? control.get('passwordAgain').value : null;
    if (password && passwordAgain && password !== passwordAgain) {
      return { passwordMismatch: true };
    }
    return null;
  }

}
