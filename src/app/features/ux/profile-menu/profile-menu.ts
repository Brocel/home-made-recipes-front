import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { User } from '@models/user';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './profile-menu.html',
  styleUrls: ['./profile-menu.scss'],
})
export class ProfileMenu {
  /** Inputs */
  user = input<User | null>();
  isAuthenticated = input<boolean>(false);

  /** Outputs */
  login = output<void>();
  profile = output<void>();
  dashboard = output<void>();
  logout = output<void>();

  open = signal(false);

  toggle() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
  }

  onLogin() {
    this.close();
    this.login.emit();
  }

  onProfile() {
    this.close();
    this.profile.emit();
  }

  onDashboard() {
    this.close();
    this.dashboard.emit();
  }

  onLogout() {
    this.close();
    this.logout.emit();
  }
}
