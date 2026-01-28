import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@app/core/i18n/language.service';
import { ProfileMenu } from '@ui/menu/profile-menu/profile-menu';
import { NavigationService } from '@core/navigation/navigation.service';
import { QuickSearch } from '@features/recipes/forms/search/quick-search/quick-search';
import { LeftMenu } from '@ui/menu/left-menu/left-menu';
import { AuthService } from '@core/auth/auth.service';
import { MatDivider } from '@angular/material/divider';

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

  constructor(
    public lang: LanguageService,
    private auth: AuthService,
    private nav: NavigationService,
  ) {}

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
    void this.nav.openLoginModal();
  }

  goProfile() {
    void this.nav.gotToProfile();
  }

  signOut() {
    this.auth.logout();
    void this.nav.goHome();
  }
}
