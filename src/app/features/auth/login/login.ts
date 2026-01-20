import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements AfterViewInit {
  constructor(private auth: AuthService) {}

  // ngAfterViewInit est le bon hook pour manipuler le DOM et appeler initGsi
  ngAfterViewInit() {
    // Demande au service d'initialiser GSI et de rendre le bouton dans l'élément #google-button
    this.auth.initGsi('google-button');
  }
}
