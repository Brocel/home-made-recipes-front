import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenService {
  getDecodedToken(token: string | null): any | null {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    try {
      const payload = atob(parts[1]);
      return JSON.parse(payload);
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string | null): boolean {
    const decoded = this.getDecodedToken(token);
    if (!decoded?.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }
}
