import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavigationService } from '@core/navigation/navigation.service';
import { AuthService } from '../services/auth.service';
import { AuthStore } from '../store/auth.store';

export const AuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const nav = inject(NavigationService);
  const auth = inject(AuthService);

  if (!authStore.isAuthenticated()) {
    nav.openLoginModal();
    return false;
  }

  if (auth.isTokenExpired()) {
    auth.logout();
    nav.openLoginModal();
    return false;
  }

  return true;
};
