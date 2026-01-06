// Composant Login minimal (fichiers séparés login.ts / login.html / login.scss)
// Ce composant initialise GSI après le rendu de la vue (ngAfterViewInit)
// et affiche l'élément dans lequel Google rendra son bouton.

import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements AfterViewInit {
  constructor(private auth: AuthService) {
  }

  // ngAfterViewInit est le bon hook pour manipuler le DOM et appeler initGsi
  ngAfterViewInit() {
    // Demande au service d'initialiser GSI et de rendre le bouton dans l'élément #google-button
    this.auth.initGsi('google-button');
  }
}
