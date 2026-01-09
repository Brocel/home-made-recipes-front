// Service d'authentification : initialise GSI, gère la réception de l'id_token,
// envoie le token au backend et met à jour les signaux d'état.
// Le backend doit valider l'id_token et renvoyer les infos utilisateur ou créer une session.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { currentUser, isAuthenticated } from './auth.signals';
import { environment } from '@env/environment';
import { AuthResponse } from '@models/auth/auth.response';

// Déclare l'objet global fourni par le script GSI
declare const google: any;

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  /**
   * initGsi
   * - Initialise Google Identity Services avec le client_id.
   * - Définit la callback qui sera appelée quand Google renvoie un id_token.
   * - Rend le bouton Google dans l'élément dont l'id est buttonElementId.
   *
   * ux_mode: 'popup' évite les redirections complètes de page (pratique pour SPA).
   */
  initGsi(buttonElementId = 'google-button') {
    // Vérification que le script GSI est chargé
    if (typeof window === 'undefined' || typeof google === 'undefined') {
      console.warn('GSI script not loaded. Ensure <script src="https://accounts.google.com/gsi/client"> is in index.html');
      return;
    }

    // Initialise GSI avec le client_id public
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.handleCredentialResponse(response),
      ux_mode: 'popup' // évite la redirection complète de la page
    });

    // Rendu du bouton Google dans le DOM
    const el = document.getElementById(buttonElementId);
    if (el) {
      google.accounts.id.renderButton(el, {
        theme: 'outline',
        size: 'large',
        type: 'standard'
      });
    } else {
      // Si l'élément n'existe pas encore (ex. rendu asynchrone), on log pour debug
      console.warn(`Element with id "${buttonElementId}" not found. Call initGsi after view init.`);
    }
  }

  /**
   * handleCredentialResponse
   * - Récupère l'id_token envoyé par Google (response.credential).
   * - Envoie ce token au backend pour validation et création de session.
   * - Met à jour les signaux currentUser et isAuthenticated selon la réponse.
   */
  private handleCredentialResponse(response: any) {
    const idToken: string | undefined = response?.credential;
    if (!idToken) {
      console.error('No id_token received from Google');
      return;
    }

    // POST vers le backend. Le backend doit valider l'id_token auprès de Google
    // et renvoyer les informations utilisateur (ou créer une session cookie).
    // withCredentials: true si le backend utilise des cookies de session.
    this.http.post<AuthResponse>('/auth/google', {idToken}, {withCredentials: true})
      .subscribe({
        next: (resp) => {
          // Met à jour les signaux : l'UI réagira automatiquement aux changements
          currentUser.set(resp);
          isAuthenticated.set(true);
        },
        error: (err) => {
          // Gestion d'erreur basique : log et reset d'état si nécessaire
          console.error('Auth backend error', err);
          currentUser.set(null);
          isAuthenticated.set(false);
        }
      });
  }

  /**
   * logout
   * - Appelle le backend pour détruire la session (si cookie) et réinitialise les signaux.
   * - Ne révoque pas automatiquement le token Google côté client
   */
  logout() {
    this.http.post('/auth/logout', {}, {withCredentials: true})
      .subscribe({
        next: () => {
          currentUser.set(null);
          isAuthenticated.set(false);
        },
        error: (err) => {
          console.error('Logout error', err);
          // Même en cas d'erreur, on nettoie l'état local pour éviter incohérences UI
          currentUser.set(null);
          isAuthenticated.set(false);
        }
      });
  }

}
