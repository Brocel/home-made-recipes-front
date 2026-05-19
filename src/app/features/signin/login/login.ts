import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { LoginRequest } from '@auth/login.request';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form-field/form-field';
import { FormInput } from '@primitives/form-input/form-input';
import { FormSection } from '@primitives/form-section/form-section';
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
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private notif = inject(NotificationService);

  // =========================================================
  // Inputs
  // =========================================================
  prefillEmail = input<string | undefined>(undefined);

  // =========================================================
  // Ouputs
  // =========================================================
  successfulLogin = output<void>();
  registerClick = output<void>();

  // =========================================================
  // State
  // =========================================================
  loading = signal(false);
  errorKey = signal<string | null>(null);

  // =========================================================
  // Form
  // =========================================================
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      const email = this.prefillEmail();

      if (email) {
        this.form.patchValue({
          email,
        });
      }
    });
  }

  // =========================================================
  // Actions
  // =========================================================
  submit(): void {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.errorKey.set(null);

    const payload: LoginRequest = this.form.getRawValue();

    this.authService.login(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.successfulLogin.emit();
        this.notif.showSuccess('login.success');
      },
      error: (err) => {
        this.loading.set(false);
        this.errorKey.set(err.errorKey ?? 'UNKNOWN_ERROR');
      },
    });
  }

  goToRegister() {
    this.registerClick.emit();
  }
}
