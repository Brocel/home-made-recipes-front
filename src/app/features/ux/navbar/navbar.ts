import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { AuthDialogService } from '@auth/auth-dialog.service';
import { AuthService } from '@auth/auth.service';
import { LeftMenu } from '@menu/left-menu/left-menu';
import { ProfileMenu } from '@menu/profile-menu/profile-menu';
import { NavigationService } from '@nav/navigation.service';
import { TranslatePipe } from '@ngx-translate/core';
import { QuickSearch } from '@recipes/search/quick-search/quick-search';
import { LanguageService } from '@translation/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslatePipe,
    ProfileMenu,
    QuickSearch,
    LeftMenu,
    MatDivider,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  @Input() user: any | null = null;
  @Input() isAuthenticated = false;

  lang = inject(LanguageService);
  private auth = inject(AuthService);
  private nav = inject(NavigationService);
  private authModal = inject(AuthDialogService);

  // Language toggle
  toggleLang(): void {
    const next = this.lang.current() === 'fr' ? 'pt-BR' : 'fr';
    this.lang.use(next);
  }

  goHome() {
    void this.nav.goHome();
  }

  goToAdvancedSearch(prefill?: any) {
    void this.nav.goToAdvancedSearch(prefill);
  }

  goToAddRecipe() {
    void this.nav.goToAddRecipeFull();
  }

  goLogin() {
    void this.authModal.openLoginModal();
  }

  goProfile() {
    void this.nav.goToProfile();
  }

  signOut() {
    this.auth.logout();
    void this.nav.goHome();
  }
}
