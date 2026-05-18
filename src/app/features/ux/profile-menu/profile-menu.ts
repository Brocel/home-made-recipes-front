import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { User } from '@models/user';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingCloseItemDirective } from '@ui/surfaces/directives/floating-close-item.directive';
import { FloatingSurface } from '@ui/surfaces/floating-surface/floating-surface';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule, FloatingSurface, FloatingCloseItemDirective],
  templateUrl: './profile-menu.html',
  styleUrls: ['./profile-menu.scss'],
})
export class ProfileMenu {
  // =========================================================
  // Inputs
  // =========================================================
  user = input<User | null>();
  isAuthenticated = input<boolean>(false);

  // =========================================================
  // Outputs
  // =========================================================
  login = output<void>();
  profile = output<void>();
  dashboard = output<void>();
  logout = output<void>();

  // =========================================================
  // Actions
  // =========================================================

  onLogin() {
    this.login.emit();
  }

  onProfile() {
    this.profile.emit();
  }

  onDashboard() {
    this.dashboard.emit();
  }

  onLogout() {
    this.logout.emit();
  }
}
