import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FloatingContentDirective } from '@directives/floating-content.directive';
import { FloatingTriggerDirective } from '@directives/floating-trigger.directive';
import { User } from '@models/user';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingSurface } from '@overlays/floating-surface/floating-surface';
import { MenuService } from '@uiServices/menu.service';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FloatingSurface,
    FloatingTriggerDirective,
    FloatingContentDirective,
  ],
  templateUrl: './profile-menu.html',
  styleUrls: ['./profile-menu.scss'],
})
export class ProfileMenu {
  // =========================================================
  // Controllers
  // =========================================================
  readonly menu = new MenuService();

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
    this.menu.closeMenu();
  }

  onProfile() {
    this.profile.emit();
    this.menu.closeMenu();
  }

  onDashboard() {
    this.dashboard.emit();
    this.menu.closeMenu();
  }

  onLogout() {
    this.logout.emit();
    this.menu.closeMenu();
  }
}
