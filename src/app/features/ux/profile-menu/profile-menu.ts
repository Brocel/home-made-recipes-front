import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FloatingContentDirective } from '@directives/floating-content.directive';
import { FloatingTriggerDirective } from '@directives/floating-trigger.directive';
import { UserSession } from '@models/user/user-session';
import { TranslateModule } from '@ngx-translate/core';
import { FloatingSurface } from '@overlays/floating-surface/floating-surface';
import { MenuService } from '@uiServices/menu.service';
import { LayerType, Position } from '@uiTypes/overlay.types';

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
  // Dependencies
  // =========================================================
  private menu = inject(MenuService);

  // =========================================================
  // Porperties
  // =========================================================
  position: Position = 'anchored';
  layer: LayerType = 'dropdown';

  // =========================================================
  // Inputs
  // =========================================================
  user = input<UserSession | null>();
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
  open() {
    return this.menu.isOpen();
  }

  toggle() {
    this.menu.toggle();
  }

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
