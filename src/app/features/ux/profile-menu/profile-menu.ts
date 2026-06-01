import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FloatingContentDirective } from '@directives/floating-content.directive';
import { FloatingTriggerDirective } from '@directives/floating-trigger.directive';
import { UserProfile } from '@models/user/user-profile';
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
  private readonly menu = inject(MenuService);

  // =========================================================
  // Porperties
  // =========================================================
  readonly position: Position = 'anchored';
  readonly layer: LayerType = 'dropdown';

  // =========================================================
  // Inputs
  // =========================================================
  readonly user = input<UserSession | null>();
  readonly userProfile = input<UserProfile | null>();
  readonly isAuthenticated = input<boolean>(false);

  // =========================================================
  // Outputs
  // =========================================================
  readonly login = output<void>();
  readonly profile = output<void>();
  readonly dashboard = output<void>();
  readonly logout = output<void>();

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
