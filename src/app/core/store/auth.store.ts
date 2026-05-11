import { computed, inject, Injectable, signal } from '@angular/core';
import { TokenService } from '@auth/token.service';
import { User } from '@models/user';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly tokenService = inject(TokenService);

  // --- Signals ---
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);

  // --- Public readonly signals ---
  user = computed(() => this._user());
  token = computed(() => this._token());

  roles = computed(() => this._user()?.roles ?? []);
  isAuthenticated = computed(() => {
    const token = this._token();
    if (!token) {
      return false;
    }
    return !this.tokenService.isTokenExpired(token);
  });

  // --- Mutators (appelés par AuthService) ---
  setUser(user: User | null): void {
    this._user.set(user);
  }

  setToken(token: string | null): void {
    this._token.set(token);
  }

  clear(): void {
    this._user.set(null);
    this._token.set(null);
  }
}
