import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthDialogService } from '@auth/auth-dialog.service';
import { AuthService } from '@auth/auth.service';
import { NavigationService } from '@nav/navigation.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '@store/auth.store';
import { LanguageService } from '@translation/language.service';
import { ProfileMenu } from '../profile-menu/profile-menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, ProfileMenu],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  // =========================================================
  // Dependencies
  // =========================================================
  private lang = inject(LanguageService);
  private auth = inject(AuthService);
  private authStore = inject(AuthStore);
  private nav = inject(NavigationService);
  private authModal = inject(AuthDialogService);

  // =========================================================
  // State
  // =========================================================
  currentLang = this.lang.current;
  user = computed(() => this.authStore.user());
  isAuthenticated = computed(() => this.authStore.isAuthenticated());
  logoUrl: string = 'assets/recipe-book.png';

  // Language selection
  setLang(selectedLang: string) {
    this.lang.use(selectedLang);
  }

  // Navigation
  goHome() {
    void this.nav.goHome();
  }

  goLogin() {
    void this.authModal.openLoginModal();
  }

  goProfile() {
    void this.nav.goToProfile();
  }

  goDashboard() {
    void this.nav.goToProfile();
  }

  signOut() {
    this.auth.logout();
    void this.nav.goHome();
  }
}
