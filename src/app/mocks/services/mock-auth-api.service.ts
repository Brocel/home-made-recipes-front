import { Injectable } from '@angular/core';
import { MOCK_USERS } from '@mocks/data/users.mocks';
import { FAKE_TOKEN, latency } from '@mocks/utils/mock.constant';
import { User } from '@models/user';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockAuthApiService {
  private users: User[] = structuredClone(MOCK_USERS);

  login(username: string): Observable<{ token: string; user: User }> {
    const user = this.users.find((u) => u.username === username);

    if (!user) {
      return throwError(() => ({
        status: 401,
        message: 'Invalid credentials',
      }));
    }

    return of({
      token: FAKE_TOKEN,
      user,
    }).pipe(delay(latency));
  }

  logout(): Observable<void> {
    return of(void 0).pipe(delay(latency));
  }
}
