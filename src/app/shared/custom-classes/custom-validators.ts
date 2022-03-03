import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.get('password')?.value;
    const passwordConfirm: string = control.get('passwordConfirm')?.value;
    console.log(password === passwordConfirm ? null : { NoPasswordMatch: true });
    return password === passwordConfirm ? null : { NoPasswordMatch: true };
  }

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      console.log(valid ? null : error);
      return valid ? null : error;
    };
  }

}
