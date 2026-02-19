import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsernameValidator implements AsyncValidator {
  private http = inject(HttpClient);
  private readonly baseUrl = '/hmr/api/auth/check-username';

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const value = control.value;

    if (!value || value.length < 5) {
      return of(null);
    }

    // debounce 300ms
    return timer(300).pipe(
      switchMap(() =>
        this.http.get<boolean>(`${this.baseUrl}?value=${value}`).pipe(
          map((exists) => (exists ? { usernameTaken: true } : null)),
          catchError(() => of(null)), // do not block if backend error
        ),
      ),
    );
  }
}
