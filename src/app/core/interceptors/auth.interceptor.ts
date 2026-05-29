import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { ModalService } from '@uiServices/modal.service';
import { buildLoginConfig } from '@utils/modal.util';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const modal = inject(ModalService);

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
        // Defer modal opening to next tick to avoid interrupting current flow
        setTimeout(() => modal.open(buildLoginConfig()), 0);
      }
      return throwError(() => err);
    }),
  );
};
