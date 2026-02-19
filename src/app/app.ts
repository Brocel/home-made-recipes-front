import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AuthStore } from '@core/store/auth.store';
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
export class App implements OnInit {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private authService = inject(AuthService);

  user = this.authStore.user();
  isAuthenticated = this.authStore.isAuthenticated();

  ngOnInit(): void {
    this.authService.loadAuthFromStorage();
  }

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
