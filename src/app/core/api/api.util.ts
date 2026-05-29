import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

/**
 * Handle HTTP errors.
 * @param error The HTTP error response.
 * @returns An observable that throws an error.
 */
export function handleError(apiName: string, error: HttpErrorResponse) {
  console.error(`${apiName} error`, { status: error.status, url: error.url, error: error.error });

  const apiMessage = error.error?.message ?? error.message ?? 'unknown';

  return throwError(() => ({
    status: error.status,
    message: apiMessage,
    raw: error.error,
  }));
}
