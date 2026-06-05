import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const emailValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;

  if (!value) return { required: true };

  if (value.length < 6) return { emailMinLength: 'Email must be at least 6 characters.' };

  if (value.length > 100) return { emailMaxLength: 'Email cannot exceed 100 characters.' };

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) return { invalidEmail: 'Invalid email address.' };

  return null;
};
