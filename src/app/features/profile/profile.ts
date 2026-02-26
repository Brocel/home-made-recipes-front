import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { UsernameValidator } from '@app/core/validators/username.validator';
import { User } from '@app/shared/models/user';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  private usernameValidator = inject(UsernameValidator);

  user: User | null = null;

  isEditing = signal(false);
  loading = signal(false);
  errorKey = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    first_name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    last_name: this.fb.nonNullable.control('', { validators: [Validators.required] }),
    username: this.fb.nonNullable.control('', {
      validators: [Validators.required],
      asyncValidators: [this.usernameValidator.validate.bind(this.usernameValidator)],
      updateOn: 'blur',
    }),
    birth_date: this.fb.nonNullable.control('', {
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
  }

  startEditing() {
    this.isEditing.set(true);
  }

  updateUserInfo(): void {}

  updateAvatar(): void {}
}
