import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthDialogService } from '@auth/auth-dialog.service';
import { AuthService } from '@auth/auth.service';
import { AuthStore } from '@store/auth.store';

export const AuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const authModal = inject(AuthDialogService);
  const auth = inject(AuthService);

  if (!authStore.isAuthenticated()) {
    authModal.openLoginModal();
    return false;
  }

  if (auth.isTokenExpired()) {
    auth.logout();
    authModal.openLoginModal();
    return false;
  }

  return true;
};
