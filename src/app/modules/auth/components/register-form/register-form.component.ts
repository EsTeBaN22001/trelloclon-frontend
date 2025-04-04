import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';

import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
})
export class RegisterFormComponent {
  userForm = this.formBuilder.nonNullable.group({
    email: [
      '',
      {
        validators: [Validators.email, Validators.required],
        asyncValidators: [CustomValidators.availableEmail(this.authService)],
      },
    ],
  });

  form = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: [
        '',
        {
          validators: [Validators.email, Validators.required],
          asyncValidators: [CustomValidators.availableEmail(this.authService)],
        },
      ],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('password', 'confirmPassword'),
      ],
    },
  );
  status: RequestStatus = 'init';
  userStatus: RequestStatus = 'init';
  showRegister: boolean = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  register() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();

      this.authService.register(name, email, password).subscribe({
        next: () => {
          this.status = 'success';

          const { email, password } = this.form.getRawValue();
          this.authService.login(email, password).subscribe({
            next: () => {
              this.status = 'success';
              this.router.navigate(['/app']);
            },
            error: () => {
              this.status = 'failed';
            },
          });
        },
        error: (error) => {
          this.status = 'failed';
          if (error.error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
          }
        },
      });
    } else {
      this.status = 'failed';
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.userForm.valid) {
      this.userStatus = 'loading';
      const email = this.userForm.getRawValue().email;

      this.authService.isAvailable(email).subscribe({
        next: ({ isAvailable }) => {
          if (isAvailable) {
            this.showRegister = true;
            this.form.controls.email.setValue(email);
          }
        },
        error: () => {
          this.showRegister = false;
          this.userStatus = 'failed';
        },
      });
    } else {
      this.status = 'failed';
      this.userForm.markAllAsTouched();
    }
  }
}
