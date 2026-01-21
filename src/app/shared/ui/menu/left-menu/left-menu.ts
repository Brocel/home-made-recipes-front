import { Component, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-left-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule, MatMenuModule],
  templateUrl: './left-menu.html',
  styleUrls: ['./left-menu.scss'],
})
export class LeftMenu {
  @Output() openHome = new EventEmitter<void>();
  @Output() openAdvancedSearch = new EventEmitter<void>();
  @Output() openAddRecipe = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  menuOpen = false;

  closeMenu(): void {
    this.menuOpen = false;
    this.close.emit();
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
