import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationService } from '@app/core/navigation/navigation.service';
import { AuthService } from '@app/core/services/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthStore } from '../store/auth.store';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const nav = inject(NavigationService);
  const store = inject(AuthStore);

  const publicEndpoints = ['/auth/login', '/auth/register', '/auth/check-username'];

  // Pas de token sur les endpoints publics
  if (publicEndpoints.some((endpoint) => req.url.includes(endpoint))) {
    return next(req);
  }

  const token = store.token();
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        auth.logout();
        nav.openLoginModal();
      }
      return throwError(() => err);
    }),
  );
};
