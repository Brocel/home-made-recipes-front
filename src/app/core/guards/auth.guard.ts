import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { NavigationService } from '@core/navigation/navigation.service';
import { isAuthenticated } from '../state/auth.state';

export const authGuard: CanActivateFn = () => {
  if (!isAuthenticated()) {
    inject(NavigationService).openLoginModal();
  }
  return isAuthenticated();
};
