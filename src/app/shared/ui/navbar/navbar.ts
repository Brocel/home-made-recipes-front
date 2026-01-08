import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@app/core/i18n/language.service';
import { ProfileMenu } from '@ui/menu/profile-menu/profile-menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, ProfileMenu],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  @Input() user: any | null = null;
  @Input() isAuthenticated = false;

  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() addRecipe = new EventEmitter<void>();

  // état du menu profil
  profileMenuOpen = false;

  constructor(public lang: LanguageService, private host: ElementRef<HTMLElement>) {}

  toggleLang(): void {
    const next = this.lang.current() === 'fr' ? 'pt-BR' : 'fr';
    this.lang.use(next);
  }

  onProfileClick(): void {
    if (this.isAuthenticated) {
      this.openProfileMenu();
    } else {
      // ouvre le menu invité si on veut un petit menu, ou directement la modale login
      this.openGuestMenu();
    }
  }

  openProfileMenu(): void {
    this.profileMenuOpen = true;
    // focus management peut être ajouté ici
  }

  openGuestMenu(): void {
    this.profileMenuOpen = true;
  }

  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  // fermer sur Échap
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.profileMenuOpen) {
      this.closeProfileMenu();
      event.stopPropagation();
    }
  }

  // fermer sur clic hors menu
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.profileMenuOpen) return;
    const target = event.target as Node;
    if (!this.host.nativeElement.contains(target)) {
      this.closeProfileMenu();
    }
  }

  // actions invité
  onLoginClick(): void {
    this.closeProfileMenu();
    this.openLogin.emit();
  }

  onRegisterClick(): void {
    this.closeProfileMenu();
    this.openRegister.emit();
  }
}
