import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { currentUser, isAuthenticated } from '@app/core/auth/auth.signals';
import { Navbar } from '@ui/navbar/navbar';
import { Footer } from '@ui/footer/footer';
import { LeftPanel } from '@ui/panel/left-panel/left-panel';
import { PageLayout } from '@layout/page-layout/page-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, RouterOutlet, Footer, LeftPanel, PageLayout],
  templateUrl: './app.html',
})
export class App {
  // Expose les signaux pour le template (tu peux appeler user() et isAuthenticated() dans le HTML)
  user = currentUser;
  isAuthenticated = isAuthenticated;

  constructor(
    private router: Router,
    public auth: AuthService,
  ) {}

  /**
   * Ouvre la page / modal de login.
   * - Initialise GSI si nécessaire (affiche le bouton Google dans l'élément prévu).
   * - Navigue vers la route /login (si tu as une page dédiée).
   * Remarque : si tu utilises une modal plutôt qu'une route, remplace la navigation
   * par l'ouverture de ta modal et appelle auth.initGsi() après le rendu du DOM.
   */
  handleOpenLogin(): void {
    try {
      // initialise le bouton Google (si le DOM contient l'élément #google-button)
      this.auth.initGsi('google-button');

      // navigation vers une page de login (si tu as une route)
      this.router.navigate(['/login']).catch((err) => {
        console.warn('Navigation vers /login échouée', err);
      });
    } catch (err) {
      console.error('Erreur lors de l’ouverture du login', err);
    }
  }

  /**
   * Ouvre la page / modal d'inscription.
   * - Navigue vers /register par défaut.
   * - Si tu utilises une modal, remplace la navigation par l'ouverture de la modal.
   */
  handleOpenRegister(): void {
    this.router.navigate(['/register']).catch((err) => {
      console.warn('Navigation vers /register échouée', err);
    });
  }

  /**
   * Ouvre la page de création de recette complète.
   * - Navigue vers /recipes/create.
   * - Si tu veux préremplir le formulaire, tu peux passer un state ou queryParams.
   */
  handleAddRecipe(): void {
    this.router.navigate(['/recipes/create']).catch((err) => {
      console.warn('Navigation vers /recipes/create échouée', err);
    });
  }
}
