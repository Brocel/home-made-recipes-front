import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { currentUser } from '../state/auth.state';
import { environment } from '@env/environment';
import { AuthResponse } from '@app/core/auth/auth.response';
import { TokenService } from './token.service';
import { tap } from 'rxjs';
import { LoginRequest } from '../auth/login.request';
import { RegisterRequest } from '../auth/register.request';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  login(payload: LoginRequest) {
    return this.http.post<AuthResponse>(environment.apiBase + '/auth/login', payload).pipe(
      tap(res => {
        this.tokenService.save(res.token);
        currentUser.set(res);
      })
    );
  }

  register(payload: RegisterRequest) {
    return this.http.post(environment.apiBase + '/auth/register', payload);
  }

  logout() {
    this.tokenService.clear();
    currentUser.set(null);
  }
}


