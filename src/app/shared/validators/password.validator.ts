import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: AbstractControl) => {
  const value = control.value;

  if (!value) return { required: true };

  if (value.length < 8) return { passwordMinLength: 'Password must be at least 8 characters.' };

  if (value.length > 100) return { passwordMaxLength: 'Password cannot exceed 100 characters.' };

  if (!/[0-9]+/.test(value)) return { passwordNumber: 'At least one number is required.' };

  if (!/[a-zA-Z]+/.test(value)) return { passwordLetter: 'At least one letter is required.' };

  if (!/[a-z]+/.test(value))
    return { passwordLowercase: 'At least one lowercase letter is required.' };

  if (!/[A-Z]+/.test(value))
    return { passwordUppercase: 'At least one uppercase letter is required.' };

  if (!/[@$!%*?&]+/.test(value))
    return { passwordSpecial: 'At least one special character is required.' };

  return null;
};
