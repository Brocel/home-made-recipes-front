import { CommonModule } from '@angular/common';
import { Component, Inject, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthUIService } from '@auth/auth-ui.service';
import { AuthService } from '@auth/auth.service';
import { LoginRequest } from '@auth/login.request';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { NavigationService } from '@nav/navigation.service';
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
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private nav = inject(NavigationService);
  private authUI = inject(AuthUIService);
  private notif = inject(NotificationService);

  // Inputs
  prefillEmail = input<string | undefined>(undefined);

  // --- Signals ---
  loading = signal(false);
  errorKey = signal<string | null>(null);

  // --- Form ---
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<Login>,
    @Inject(MAT_DIALOG_DATA) private data: { email: string | null },
  ) {}

  ngOnInit(): void {
    if (this.data?.email) {
      this.form.patchValue({ email: this.data.email });
    }
  }

  submit(): void {
    if (this.form.invalid || this.loading()) return;

    this.loading.set(true);
    this.errorKey.set(null);

    const payload: LoginRequest = this.form.getRawValue();

    this.authService.login(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.dialogRef.close();
        this.notif.showSuccess('login.success');
        this.nav.goHome();
      },
      error: (err) => {
        this.loading.set(false);
        this.errorKey.set(err.errorKey ?? 'UNKNOWN_ERROR');
      },
    });
  }

  goToRegister() {
    this.dialogRef.close();
    this.authUI.openRegister();
  }
}
