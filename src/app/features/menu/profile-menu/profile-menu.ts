import { Component, EventEmitter, Input, Output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-profile-menu',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule,
    MatMenuModule,
    MatMenuTrigger,
    MatDividerModule,
  ],
  templateUrl: './profile-menu.html',
  styleUrls: ['./profile-menu.scss'],
})
export class ProfileMenu {
  /** Inputs */
  @Input() user: any = null;
  @Input() isAuthenticated = false;

  /** Outputs */
  @Output() openLogin = new EventEmitter<void>();
  @Output() openProfile = new EventEmitter<void>();
  @Output() signOut = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  menuOpen = false;

  // Close the menu and emit close event so parent can react if needed
  closeMenu(): void {
    this.menuOpen = false;
    this.close.emit();
  }

  // Emit-only handlers — Navbar will handle navigation
  openDashboardClick(): void {
    this.closeMenu();
    // emit an event here if you want to handle dashboard navigation centrally
  }

  openLoginClick(): void {
    this.closeMenu();
    this.openLogin.emit();
  }

  openProfileClick(): void {
    this.closeMenu();
    this.openProfile.emit();
  }

  signOutClick(): void {
    this.closeMenu();
    this.signOut.emit();
  }
}
