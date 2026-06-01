import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '@auth/auth.response';
import { LoginRequest } from '@auth/login.request';
import { RegisterRequest } from '@auth/register.request';
import { TokenService } from '@auth/token.service';
import { environment } from '@env/environment';
import { User } from '@models/user/user';
import { UserSession } from '@models/user/user-session';
import { NavigationService } from '@nav/navigation.service';
import { AuthStore } from '@store/auth.store';
import { LocalStorageService } from '@store/local-storage.service';
import { TOKEN_KEY, USER_KEY } from '@store/storage.constants';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly nav = inject(NavigationService);
  private readonly store = inject(AuthStore);
  private readonly storage = inject(LocalStorageService);

  // =========================================================
  // Properties
  // =========================================================
  private baseUrl = environment.apiBase + '/auth';

  // =========================================================
  // API Methods
  // =========================================================
  login(payload: LoginRequest) {
    return this.http.post<AuthResponse>(this.baseUrl + '/login', payload).pipe(
      tap((res) => {
        if (res.token) {
          this.setSession(res.token, res.user);
        }
      }),
    );
  }

  register(payload: RegisterRequest) {
    return this.http.post(this.baseUrl + '/register', payload);
  }

  logout() {
    this.clearSession();
    void this.nav.goHome();
  }

  // =========================================================
  // Session management
  // =========================================================
  /**
   * Sets session in store and persists minimal session data to localStorage.
   * Extracts UserSession (id, email, roles) from full User response.
   * Stores full User as profile in memory (not persisted).
   */
  private setSession(token: string, user: User): void {
    const userSession: UserSession = {
      id: user.id,
      email: user.email,
      roles: user.roles,
    };

    this.store.setToken(token);
    this.store.setUser(userSession);
    this.store.setProfileDetails(user.profile);

    // Persistence: store only essential session fields to reduce XSS exposure
    this.storage.set(TOKEN_KEY, token);
    this.storage.set(USER_KEY, userSession);
  }

  /**
   * Clears session from store and localStorage.
   */
  private clearSession(): void {
    this.store.clear();

    this.storage.remove(TOKEN_KEY);
    this.storage.remove(USER_KEY);
  }

  /**
   * Restores session from localStorage if valid.
   * Decodes roles from token (token is source of truth).
   * Validates token format and expiration before restoring.
   */
  loadAuthFromStorage(): void {
    const token = this.storage.get<string>(TOKEN_KEY);
    const userSession = this.storage.get<UserSession>(USER_KEY);

    // Only restore if token exists, has valid JWT structure, and is not expired.
    if (
      token &&
      userSession &&
      this.isValidTokenFormat(token) &&
      !this.tokenService.isTokenExpired(token)
    ) {
      // Decode roles from token (source of truth for access control)
      const rolesFromToken = this.tokenService.extractRoles(token);
      userSession.roles = rolesFromToken;

      this.store.setToken(token);
      this.store.setUser(userSession);
      this.store.setProfileDetails(null);
    } else {
      this.clearSession();
    }
  }

  // =========================================================
  // Token management
  // =========================================================

  /**
   * Validates that a token has the basic JWT structure (3 dot-separated parts).
   */
  private isValidTokenFormat(token: string): boolean {
    return token.split('.').length === 3;
  }

  /**
   * Checks if the current token is expired.
   * Returns true if no token is present or if it has expired.
   */
  isTokenExpired(): boolean {
    return this.tokenService.isTokenExpired(this.store.token());
  }

  getToken(): string | null {
    return this.store.token();
  }
}
