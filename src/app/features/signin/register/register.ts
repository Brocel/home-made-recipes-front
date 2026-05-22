import { Component, inject, OnDestroy, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { RegisterRequest } from '@auth/register.request';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSection } from '@primitives/form/form-section/form-section';
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
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private usernameValidator = inject(UsernameValidator);

  // =========================================================
  // Ouputs
  // =========================================================
  successfulRegister = output<string>();

  // =========================================================
  // State
  // =========================================================
  loading = signal(false);
  errorKey = signal<string | null>(null);
  success = signal(false);

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
    confirmPassword: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
    birth_date: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  submit(): void {
    if (this.form.invalid || this.loading()) return;

    const { first_name, last_name, username, email, password, confirmPassword, birth_date } =
      this.form.getRawValue();

    if (password !== confirmPassword) {
      this.errorKey.set('register.password_mismatch');
      return;
    }

    this.loading.set(true);
    this.errorKey.set(null);

    const payload: RegisterRequest = {
      first_name,
      last_name,
      username,
      email,
      password,
      birth_date: isoToDDMMYYYY(birth_date)!,
    };

    this.auth.register(payload).subscribe({
      next: (res) => {
        this.loading.set(false);
        // ici: res.token === null, res.user rempli
        this.success.set(true);

        this.autoRedirectSub?.unsubscribe();
        this.autoRedirectSub = timer(20000).subscribe(() => {
          this.successfulRegister.emit(email);
        });
      },
      error: (err) => {
        this.loading.set(false);
        // TODO toaster plus tard
        this.errorKey.set(err.errorKey ?? 'UNKNOWN_ERROR');
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
