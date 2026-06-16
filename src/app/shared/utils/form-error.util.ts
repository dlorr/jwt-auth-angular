import { AbstractControl } from '@angular/forms';

export function getFormErrorMessage(control: AbstractControl | null): string {
  if (!control || !control.errors) return '';

  const errors = control.errors;

  if (errors['required']) return 'This field is required.';

  if (errors['emailMinLength']) return errors['emailMinLength'];
  if (errors['emailMaxLength']) return errors['emailMaxLength'];
  if (errors['invalidEmail']) return errors['invalidEmail'];

  if (errors['passwordMinLength']) return errors['passwordMinLength'];
  if (errors['passwordMaxLength']) return errors['passwordMaxLength'];
  if (errors['passwordNumber']) return errors['passwordNumber'];
  if (errors['passwordLetter']) return errors['passwordLetter'];
  if (errors['passwordLowercase']) return errors['passwordLowercase'];
  if (errors['passwordUppercase']) return errors['passwordUppercase'];
  if (errors['passwordSpecial']) return errors['passwordSpecial'];

  return 'Invalid field.';
}
