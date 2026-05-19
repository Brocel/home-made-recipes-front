import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthUIService } from '@auth/auth-ui.service';
import { AuthService } from '@auth/auth.service';
import { AuthStore } from '@store/auth.store';

export const AuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const authModal = inject(AuthUIService);
  const auth = inject(AuthService);

  if (!authStore.isAuthenticated()) {
    authModal.openLogin();
    return false;
  }

  if (auth.isTokenExpired()) {
    auth.logout();
    authModal.openLogin();
    return false;
  }

  return true;
};
