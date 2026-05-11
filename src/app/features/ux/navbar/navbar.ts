import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { LanguageService } from '@app/core/i18n/language.service';
import { AuthService } from '@app/core/services/auth.service';
import { LeftMenu } from '@app/features/menu/left-menu/left-menu';
import { ProfileMenu } from '@app/features/menu/profile-menu/profile-menu';
import { NavigationService } from '@core/navigation/navigation.service';
import { QuickSearch } from '@features/recipes/search/quick-search/quick-search';
import { TranslatePipe } from '@ngx-translate/core';

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
    void this.nav.goToProfile();
  }

  signOut() {
    this.auth.logout();
    void this.nav.goHome();
  }
}
