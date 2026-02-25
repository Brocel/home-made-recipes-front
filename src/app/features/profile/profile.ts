import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { User } from '@app/shared/models/user';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  imports: [TranslatePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private auth = inject(AuthService);

  user: User | null = null;

  isEditing = signal(false);

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
  }

  startEditing() {
    this.isEditing.set(true);
  }
}
