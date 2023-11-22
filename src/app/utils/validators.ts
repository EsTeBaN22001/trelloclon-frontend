import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { map, tap } from 'rxjs';

export class CustomValidators {
  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }

  static availableEmail(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const emailValue = control.value;
      return authService
        .isAvailable(emailValue)
        .pipe(
          map(({ isAvailable }) =>
            isAvailable ? null : { isAvailable: true },
          ),
        );
    };
  }
}
