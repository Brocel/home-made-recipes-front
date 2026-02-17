import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';
import { currentUser, isAuthenticated } from '@app/core/state/auth.state';
import { PageLayout } from '@layout/page-layout/page-layout';
import { Footer } from '@ui/footer/footer';
import { Navbar } from '@ui/navbar/navbar';
import { LeftPanel } from '@ui/panel/left-panel/left-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet, Footer, LeftPanel, PageLayout],
  templateUrl: './app.html',
})
export class App {
  user = currentUser;
  isAuthenticated = isAuthenticated;

  constructor(
    private router: Router,
    public auth: AuthService,
  ) {}

  handleOpenLogin(): void {
    try {
      this.router.navigate(['/login']).catch((err) => {
        console.warn('Navigation vers /login échouée', err);
      });
    } catch (err) {
      console.error('Erreur lors de l’ouverture du login', err);
    }
  }

  handleOpenRegister(): void {
    this.router.navigate(['/register']).catch((err) => {
      console.warn('Navigation vers /register échouée', err);
    });
  }

  handleAddRecipe(): void {
    this.router.navigate(['/recipes/create']).catch((err) => {
      console.warn('Navigation vers /recipes/create échouée', err);
    });
  }
}
