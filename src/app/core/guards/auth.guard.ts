import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavigationService } from '@core/navigation/navigation.service';
import { AuthStore } from '../store/auth.store';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  if (!authStore.isAuthenticated()) {
    inject(NavigationService).openLoginModal();
  }
  return authStore.isAuthenticated();
};
