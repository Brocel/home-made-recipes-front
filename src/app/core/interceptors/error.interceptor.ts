import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiError } from '@errors/api-error.type';
import { positionalArgsToNamedParams } from '@errors/error.utils';
import { ToasterService } from '@uiServices/toaster.service';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToasterService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError: ApiError = error.error;

      toastService.show(
        'error',
        apiError.errorKey,
        apiError.message,
        positionalArgsToNamedParams(apiError.messageArgs),
      );

      return throwError(() => ({ ...apiError }));
    }),
  );
};
