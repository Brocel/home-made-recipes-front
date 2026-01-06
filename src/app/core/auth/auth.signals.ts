// Signaux pour l'état d'authentification (Angular Signals)
// Les signaux sont des primitives réactives légères fournies par Angular 20.
// On expose ici l'utilisateur courant et un booléen indiquant si l'utilisateur est authentifié.

import { signal } from '@angular/core';
import { AuthResponse } from '@models/auth/auth.response';

// signal contenant l'utilisateur courant ou null si non connecté
export const currentUser = signal<AuthResponse | null>(null);

// signal indiquant si l'utilisateur est authentifié
export const isAuthenticated = signal<boolean>(false);
