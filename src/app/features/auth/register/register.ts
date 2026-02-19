import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterRequest } from '@core/auth/register.request';
import { NavigationService } from '@core/navigation/navigation.service';
import { AuthService } from '@core/services/auth.service';
import { UsernameValidator } from '@core/validators/username.validator';
import { TranslatePipe } from '@ngx-translate/core';
import { isoToDDMMYYYY } from '@utils/date.utils';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnDestroy {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private nav = inject(NavigationService);
  private usernameValidator = inject(UsernameValidator);

  loading = signal(false);
  errorKey = signal<string | null>(null);
  success = signal(false);

  private autoRedirectSub?: Subscription;

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

  constructor(private dialogRef: MatDialogRef<Register>) {}

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
          this.goToLoginWithEmail(email);
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
    this.goToLoginWithEmail(email);
  }

  private goToLoginWithEmail(email: string): void {
    this.dialogRef.close();
    this.nav.openLoginModal(email);
  }

  ngOnDestroy(): void {
    this.autoRedirectSub?.unsubscribe();
  }
}
