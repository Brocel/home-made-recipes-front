import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@ui/button/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, Button],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  @Input() user: any | null = null;
  @Input() isAuthenticated = false;

  @Output() changeLang = new EventEmitter<'fr' | 'pt-BR'>();
  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() addRecipe = new EventEmitter<void>();

  toggleLang() {
    this.changeLang.emit('fr'); // placeholder: toggle logic to be implemented
  }

  onProfileClick() {
    if (this.isAuthenticated) {
      // open profile menu (to implement)
    } else {
      this.openLogin.emit();
    }
  }
}
