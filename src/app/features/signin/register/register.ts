import { Component, DestroyRef, inject, OnDestroy, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { RegisterForm, RegisterRequest } from '@auth/register.request';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSection } from '@primitives/form/form-section/form-section';
import { NotificationService } from '@services/notification.service';
import { isoToDDMMYYYY } from '@utils/date.util';
import { UsernameValidator } from '@validators/username.validator';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    AppButton,
    FormLayout,
    FormSection,
    FormField,
    FormInput,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnDestroy {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly usernameValidator = inject(UsernameValidator);
  private readonly notif = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  // =========================================================
  // Ouputs
  // =========================================================
  successfulRegister = output<string>();

  // =========================================================
  // State
  // =========================================================
  readonly loading = signal(false);
  readonly success = signal(false);

  private autoRedirectSub?: Subscription;

  // =========================================================
  // Form
  // =========================================================
  form = this.fb.nonNullable.group({
    first_name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    last_name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    username: this.fb.nonNullable.control('', {
      validators: [Validators.required],
      asyncValidators: [this.usernameValidator.validate.bind(this.usernameValidator)],
      updateOn: 'blur',
    }),
    email: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirm_password: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    birth_date: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  // =========================================================
  // Actions
  // =========================================================
  submit(): void {
    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const formValue: RegisterForm = this.form.getRawValue();

    if (formValue.password !== formValue.confirm_password) {
      this.notif.showError('form.validation.password_mismatch');
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const payload: RegisterRequest = {
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      username: formValue.username,
      email: formValue.email,
      password: formValue.password,
      birth_date: isoToDDMMYYYY(formValue.birth_date)!,
    };

    this.auth
      .register(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.success.set(true);

          this.autoRedirectSub?.unsubscribe();
          this.autoRedirectSub = timer(20000).subscribe(() => {
            this.successfulRegister.emit(formValue.email);
          });
        },
        error: (err) => {
          this.loading.set(false);
          this.notif.showError(err.errorKey ?? 'UNKNOWN_ERROR');
        },
      });
  }

  confirmSuccess(): void {
    const email = this.form.controls.email.value;
    this.success.set(false);
    this.autoRedirectSub?.unsubscribe();
    this.successfulRegister.emit(email);
  }

  ngOnDestroy(): void {
    this.autoRedirectSub?.unsubscribe();
  }
}
