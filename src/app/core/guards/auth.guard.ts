import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { TokenService } from '@auth/token.service';
import { AuthStore } from '@store/auth.store';
import { ModalService } from '@uiServices/modal.service';
import { buildLoginConfig } from '@utils/modal.util';

export const AuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const modal = inject(ModalService);
  const auth = inject(AuthService);
  const tokenService = inject(TokenService);

  if (!authStore.isAuthenticated()) {
    modal.open(buildLoginConfig());
    return false;
  }

  if (auth.isTokenExpired()) {
    const email = tokenService.extractEmail(auth.getToken());
    auth.logout();
    // Extract email from token for login prefill
    modal.open(buildLoginConfig(email ?? undefined));
    return false;
  }

  return true;
};
