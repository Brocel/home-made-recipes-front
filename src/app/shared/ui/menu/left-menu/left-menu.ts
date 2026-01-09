import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor() {}

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
  }

  goAdvancedSearch(): void {
    this.closeMenu();
    this.openAdvancedSearch.emit();
  }

  goAddRecipe(): void {
    this.closeMenu();
    this.openAddRecipe.emit();
  }

}
