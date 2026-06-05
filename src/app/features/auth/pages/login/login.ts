import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Card } from '../../../../shared/components/ui/card/card';
import { Button } from '../../../../shared/components/ui/button/button';
import { ErrorMessage } from '../../../../shared/components/feedback/error-message/error-message';

import { emailValidator } from '../../../../shared/validators/email.validator';
import { passwordValidator } from '../../../../shared/validators/password.validator';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, Card, Button, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);

  submitted = false;

  form = this.fb.group({
    email: ['', [emailValidator]],
    password: ['', [passwordValidator]],
  });

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('LOGIN PAYLOAD:', this.form.getRawValue());
  }
}
