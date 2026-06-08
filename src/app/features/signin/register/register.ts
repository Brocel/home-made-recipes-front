import { Component, DestroyRef, inject, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { RegisterRequest } from '@auth/register.request';
import { RegisterForm } from '@forms/models/register-form.model';
import { REGISTER_VALIDATION_MESSAGES } from '@forms/validations/register.validation';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSection } from '@primitives/form/form-section/form-section';
import { ToasterService } from '@uiServices/toaster.service';
import { isoToDDMMYYYY } from '@utils/date.util';
import { passwordMatchValidator } from '@validators/password-match.validator';
import { UsernameValidator } from '@validators/username.validator';
import { finalize, timer } from 'rxjs';

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
export class Register {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToasterService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly usernameValidator = inject(UsernameValidator);

  // =========================================================
  // Ouputs
  // =========================================================
  readonly successfulRegister = output<string>();
  readonly loginClick = output<void>();

  // =========================================================
  // State
  // =========================================================
  readonly loading = signal(false);
  readonly success = signal(false);
  readonly submitted = signal(false);

  // =========================================================
  // Form
  // =========================================================
  readonly form = this.fb.nonNullable.group(
    {
      first_name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      last_name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
      username: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.minLength(4)],
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
    },
    {
      validators: [passwordMatchValidator],
    },
  );

  // =========================================================
  // Validation helpers
  // =========================================================
  protected readonly messages = REGISTER_VALIDATION_MESSAGES;

  // =========================================================
  // Actions
  // =========================================================
  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const formValue: RegisterForm = this.form.getRawValue();

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
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: () => {
          this.success.set(true);
          this.toast.show('success', 'feature.signin.register.success');
          // TODO: put timer on confirm popup
          timer(20000)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.confirmSuccess();
            });
        },
      });
  }

  // TODO: confirm popup
  confirmSuccess(): void {
    const email = this.form.controls.email.value;
    this.successfulRegister.emit(email);
  }

  goToLogin() {
    this.loginClick.emit();
  }
}
