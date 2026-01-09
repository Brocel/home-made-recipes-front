import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@app/core/i18n/language.service';
import { ProfileMenu } from '@ui/menu/profile-menu/profile-menu';
import { NavigationService } from '@core/navigation/navigation.service';
import { QuickSearch } from '@features/recipes/search/quick-search/quick-search';
import { LeftMenu } from '@ui/menu/left-menu/left-menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, ProfileMenu, QuickSearch, LeftMenu],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  @Input() user: any | null = null;
  @Input() isAuthenticated = false;

  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();

  // Navbar menus states
  menuOpen = false;
  profileMenuOpen = false;

  constructor(public lang: LanguageService, private host: ElementRef<HTMLElement>, private nav: NavigationService) {
  }

  // Left Menu
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  goHome() {
    this.nav.goHome();
  }

  goToAdvancedSearch(prefill?: any) {
    this.closeMenu();
    this.nav.goToAdvancedSearch(prefill);
  }

  goToAddRecipe() {
    this.closeMenu();
    this.nav.goToAddRecipeFull();
  }

  // Language toggle
  toggleLang(): void {
    const next = this.lang.current() === 'fr' ? 'pt-BR' : 'fr';
    this.lang.use(next);
  }

  // Profile Menu
  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  // Auth actions
  onLogin(): void {
    this.closeProfileMenu();
    this.openLogin.emit();
  }

  onRegister(): void {
    this.closeProfileMenu();
    this.openRegister.emit();
  }

  onProfileClick(): void {
    if (this.isAuthenticated
    ) {
      this.openProfileMenu();
    } else {
      this.openGuestMenu();
    }
  }

  // TODO: remplacer par un toggle
  openProfileMenu()
    :
    void {
    this.profileMenuOpen = true;
  }

  openGuestMenu()
    :
    void {
    this.profileMenuOpen = true;
  }

  // Close on Escape key
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent | Event) {
    const ke = event as KeyboardEvent;
    if (ke.key === 'Escape') {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
      if (this.profileMenuOpen) {
        this.profileMenuOpen = false;
      }
      ke.stopPropagation();
    }
  }

  // Close on click outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event
                  :
                  MouseEvent
  ) {
    if (!this.profileMenuOpen && !this.menuOpen) return;

    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.menuOpen = false;
      this.profileMenuOpen = false;
    }
  }

  // actions invité
  onLoginClick()
    :
    void {
    this.profileMenuOpen = false;
    this.openLogin.emit();
  }

  onRegisterClick()
    :
    void {
    this.profileMenuOpen = false;
    this.openRegister.emit();
  }
}
