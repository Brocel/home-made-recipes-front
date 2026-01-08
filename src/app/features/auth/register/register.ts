// Composant d'inscription adapté à OAuth2 via Google Identity Services (GSI).
// - Rend le bouton Google (GSI) dans l'élément #google-register-button
// - S'appuie sur AuthService.initGsi et sur la callback server-side déjà implémentée

import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { Button } from '@ui/button/button';
import { TranslatePipe } from "@ngx-translate/core";


@Component({
  selector: 'app-register',
  standalone: true,
    imports: [CommonModule, Button, TranslatePipe],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements AfterViewInit {
  // Le service AuthService initialise GSI et gère la callback (handleCredentialResponse)
  constructor(private auth: AuthService, private router: Router) {}

  // Après rendu de la vue, on demande au service d'initialiser GSI et de rendre le bouton
  ngAfterViewInit(): void {
    // On passe l'id de l'élément DOM où Google doit rendre son bouton
    this.auth.initGsi('google-register-button');
  }

  // Optionnel : méthode pour afficher une aide ou rediriger vers login si besoin
  goToLogin(): void {
    this.router.navigateByUrl('/auth/login');
  }
}
