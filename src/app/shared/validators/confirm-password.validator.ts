import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const confirmPasswordValidator = (passwordKey: string, confirmKey: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const form = control as any;

    const password = form.get(passwordKey)?.value;
    const confirm = form.get(confirmKey)?.value;

    if (!confirm) return { required: true };

    if (password !== confirm) return { passwordMismatch: 'Passwords do not match.' };

    return null;
  };
};
