import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RequestStatus } from '@models/request-status.model';
import { AuthService } from '@services/auth.service';

import { CustomValidators } from '@utils/validators';

@Component({
  selector: 'app-recovery-form',
  templateUrl: './recovery-form.component.html',
})
export class RecoveryFormComponent {
  form = this.formBuilder.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [
        CustomValidators.MatchValidator('newPassword', 'confirmPassword'),
      ],
    },
  );
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  recoveryToken: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParamMap.subscribe((params) => {
      const recoveryToken = params.get('recoveryToken');
      if (recoveryToken) {
        this.recoveryToken = recoveryToken;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  recovery() {
    if (this.form.valid) {
      this.status = 'loading';
      const newPassword = this.form.controls.newPassword.value;
      this.authService
        .changePassword(this.recoveryToken, newPassword)
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/login']);
          },
          error: () => {
            this.status = 'failed';
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
