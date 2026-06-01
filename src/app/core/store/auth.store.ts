import { computed, inject, Injectable, signal } from '@angular/core';
import { TokenService } from '@auth/token.service';
import { UserProfile } from '@models/user/user-profile';
import { UserSession } from '@models/user/user-session';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly tokenService = inject(TokenService);

  // --- Signals ---
  private _user = signal<UserSession | null>(null);
  private _profileDetails = signal<UserProfile | null>(null);
  private _token = signal<string | null>(null);

  // --- Public readonly signals ---
  user = computed(() => this._user());
  profileDetails = computed(() => this._profileDetails());
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
  setUser(user: UserSession | null): void {
    this._user.set(user);
  }

  setProfileDetails(profileDetails: UserProfile | null): void {
    this._profileDetails.set(profileDetails);
  }

  setToken(token: string | null): void {
    this._token.set(token);
  }

  clear(): void {
    this._user.set(null);
    this._profileDetails.set(null);
    this._token.set(null);
  }
}
