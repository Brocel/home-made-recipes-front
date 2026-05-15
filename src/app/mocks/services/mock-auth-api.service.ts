import { Injectable } from '@angular/core';
import { MOCK_USERS } from '@mocks/data/users.mocks';
import { createFakeJwt } from '@mocks/utils/api.util';
import { latency, TOKEN_EXPIRATION_TIME_S } from '@mocks/utils/mock.constant';
import { User } from '@models/user';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockAuthApiService {
  private users: User[] = structuredClone(MOCK_USERS);

  login(email: string): Observable<{ token: string; user: User }> {
    const user = this.users.find((u) => u.email === email);

    if (!user) {
      return throwError(() => ({
        status: 401,
        message: 'Invalid credentials',
      }));
    }

    return of({
      token: createFakeJwt(TOKEN_EXPIRATION_TIME_S),
      user,
    }).pipe(delay(latency));
  }

  logout(): Observable<void> {
    return of(void 0).pipe(delay(latency));
  }
}
