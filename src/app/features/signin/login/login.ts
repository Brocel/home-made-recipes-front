import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseSize } from '@appTypes/style.type';
import { AuthService } from '@auth/auth.service';
import { LoginRequest } from '@auth/login.request';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSection } from '@primitives/form/form-section/form-section';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    FormLayout,
    FormSection,
    FormField,
    FormInput,
    AppButton,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly notif = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  // =========================================================
  // Inputs
  // =========================================================
  readonly loginData = input<any>('');

  // =========================================================
  // Ouputs
  // =========================================================
  readonly successfulLogin = output<void>();
  readonly registerClick = output<void>();

  // =========================================================
  // State
  // =========================================================
  readonly loading = signal(false);
  readonly inputSize: BaseSize = 'lg';

  // =========================================================
  // Form
  // =========================================================
  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // =========================================================
  // Validation helpers
  // =========================================================
  protected readonly emailError = computed(() => {
    const control = this.form.controls.email;

    if (!control.touched || !control.invalid) {
      return null;
    }

    return 'form.validation.email';
  });

  protected readonly passwordError = computed(() => {
    const control = this.form.controls.password;

    if (!control.touched || !control.invalid) {
      return null;
    }

    return 'form.validation.password';
  });

  constructor() {
    const data = this.loginData();

    if (data?.email) {
      this.form.patchValue({
        email: data.email,
      });
    }
  }

  // =========================================================
  // Actions
  // =========================================================
  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload: LoginRequest = this.form.getRawValue();

    this.auth
      .login(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.successfulLogin.emit();
          this.notif.showSuccess('feature.signin.login.success');
        },
        error: (err) => {
          this.loading.set(false);
          this.notif.showError(err.errorKey ?? 'UNKNOWN_ERROR');
        },
      });
  }

  goToRegister() {
    this.registerClick.emit();
  }
}
