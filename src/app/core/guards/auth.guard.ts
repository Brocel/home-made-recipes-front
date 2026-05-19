import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { AuthStore } from '@store/auth.store';
import { ModalService } from '@uiServices/modal.service';
import { buildLoginConfig } from '@utils/modal.util';

export const AuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const modal = inject(ModalService);
  const auth = inject(AuthService);

  if (!authStore.isAuthenticated()) {
    modal.open(buildLoginConfig());
    return false;
  }

  if (auth.isTokenExpired()) {
    auth.logout();
    modal.open(buildLoginConfig(authStore.user()?.email));
    return false;
  }

  return true;
};
