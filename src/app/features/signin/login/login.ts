import { CommonModule } from '@angular/common';
import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@auth/auth.service';
import { LoginRequest } from '@auth/login.request';
import { NavigationService } from '@nav/navigation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private nav = inject(NavigationService);

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
        this.nav.showSuccess('login.success');
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
    this.nav.openRegisterModal();
  }
}
