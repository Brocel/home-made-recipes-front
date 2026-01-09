import { Component, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '@app/core/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './left-menu.html',
  styleUrls: ['./left-menu.scss']
})
export class LeftMenu {
  @Output() openHome = new EventEmitter<void>();
  @Output() openAdvancedSearch = new EventEmitter<void>();
  @Output() openAddRecipe = new EventEmitter<void>();

  menuOpen = false;

  constructor(private host: ElementRef<HTMLElement>, private nav: NavigationService) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  // Actions
  goHome(): void {
    this.closeMenu();
    this.openHome.emit();
    this.nav.goHome();
  }

  goAdvancedSearch(prefill?: any): void {
    this.closeMenu();
    this.openAdvancedSearch.emit();
    this.nav.goToAdvancedSearch(prefill);
  }

  goAddRecipe(prefill?: any): void {
    this.closeMenu();
    this.openAddRecipe.emit();
    this.nav.goToAddRecipeFull(prefill);
  }

  // fermeture au clic hors composant
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.menuOpen = false;
    }
  }

  // Close on Escape key
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent | Event) {
    const ke = event as KeyboardEvent;
    if (ke.key === 'Escape') {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
      ke.stopPropagation();
    }
  }
}
