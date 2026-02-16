import { HttpInterceptorFn } from '@angular/common/http';
import { currentUser } from '../state/auth.state';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const user = currentUser();

  if (user?.token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${user.token}` }
    });
  }

  return next(req);
};


