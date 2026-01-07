import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '@ui/button/button';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@core/i18n/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, Button, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar {
  @Input() user: any | null = null;
  @Input() isAuthenticated = false;

  @Output() openLogin = new EventEmitter<void>();
  @Output() openRegister = new EventEmitter<void>();
  @Output() addRecipe = new EventEmitter<void>();

  constructor(public lang: LanguageService) {
  } // bascule cyclique FR <-> PT-BR

  toggleLang(): void {
    const next = this.lang.current() === 'fr' ? 'pt-BR' : 'fr';
    this.lang.use(next);
  }

  onProfileClick() {
    if (this.isAuthenticated) {
      // open profile menu (to implement)
    } else {
      this.openLogin.emit();
    }
  }
}
