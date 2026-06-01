import { Injectable } from '@angular/core';
import { Role } from '@models/auth/role';

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

  /**
   * Extract roles from JWT claims.
   * Used to restore access control state without server call.
   */
  extractRoles(token: string | null): Role[] {
    const decoded = this.getDecodedToken(token);
    if (!decoded?.roles || !Array.isArray(decoded.roles)) {
      return [];
    }
    // JWT contains role names as strings; map to Role objects
    return decoded.roles.map((name: string) => ({ id: '', name }));
  }

  /**
   * Extract email from JWT claims (stored as 'sub').
   * Used for login modal prefill when token is expired.
   */
  extractEmail(token: string | null): string | null {
    const decoded = this.getDecodedToken(token);
    return decoded?.sub ?? null;
  }
}
