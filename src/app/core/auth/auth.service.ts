import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthResponse } from '@auth/auth.response';
import { LoginRequest } from '@auth/login.request';
import { RegisterRequest } from '@auth/register.request';
import { TokenService } from '@auth/token.service';
import { environment } from '@env/environment';
import { User } from '@models/user';
import { NavigationService } from '@nav/navigation.service';
import { AuthStore } from '@store/auth.store';
import { LocalStorageService } from '@store/local-storage.service';
import { TOKEN_KEY, USER_KEY } from '@store/storage.constants';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private nav = inject(NavigationService);
  private store = inject(AuthStore);
  private storage = inject(LocalStorageService);

  private baseUrl = environment.apiBase + '/auth';

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
    this.nav.goHome();
  }

  // ---- Session management ----
  private setSession(token: string, user: User): void {
    this.store.setToken(token);
    this.store.setUser(user);

    // Persitence
    this.storage.set(TOKEN_KEY, token);
    this.storage.set(USER_KEY, user);
  }

  private clearSession(): void {
    this.store.clear();

    this.storage.remove(TOKEN_KEY);
    this.storage.remove(USER_KEY);
  }

  loadAuthFromStorage(): void {
    const token = this.storage.get<string>(TOKEN_KEY);
    const user = this.storage.get<User>(USER_KEY);
    if (token && user) {
      this.store.setToken(token);
      this.store.setUser(user);
    } else {
      this.clearSession();
    }
  }

  isTokenExpired(): boolean {
    return this.tokenService.isTokenExpired(this.store.token());
  }

  getToken(): string | null {
    return this.store.token();
  }
}
