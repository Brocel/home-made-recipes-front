import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthDialogService } from '@auth/auth-dialog.service';
import { AuthService } from '@auth/auth.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const authModal = inject(AuthDialogService);

  const publicEndpoints = [
    '/auth/login',
    '/auth/register',
    '/auth/check-username',
    '/recipes/daily',
  ];

  // No token on public endpoints
  if (publicEndpoints.some((endpoint) => req.url.includes(endpoint))) {
    return next(req);
  }

  const token = auth.getToken();
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
        authModal.openLoginModal();
      }
      return throwError(() => err);
    }),
  );
};
