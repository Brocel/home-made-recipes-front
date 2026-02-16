import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = error.error;
      const errorCode = apiError?.error || 'UNKNOWN_ERROR';

      return throwError(() => ({ errorKey: errorCode }));
    }),
  );
};
