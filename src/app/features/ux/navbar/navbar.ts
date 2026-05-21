import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { NavigationService } from '@nav/navigation.service';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthStore } from '@store/auth.store';
import { LanguageService } from '@translation/language.service';
import { ModalService } from '@uiServices/modal.service';
import { FEATURE_ROUTES } from '@utils/datas/feature-data.util';
import { buildConfirmConfig, buildLoginConfig, buildProfileConfig } from '@utils/modal.util';
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
  private modal = inject(ModalService);

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
    this.modal.open(buildLoginConfig());
  }

  goProfile() {
    this.modal.open(buildProfileConfig(this.authStore.user()!));
  }

  goDashboard() {
    this.nav.goToFeature([FEATURE_ROUTES.dashboard]);
  }

  async signOut() {
    const result = await this.modal.openForResult<'confirm'>(
      buildConfirmConfig(
        'danger',
        'default',
        'common.logout.title',
        'common.logout.message',
        'common.ok',
        'common.cancel',
      ),
    );

    if (!result.confirmed) {
      return;
    }

    this.auth.logout();
    this.nav.goHome();
  }
}
