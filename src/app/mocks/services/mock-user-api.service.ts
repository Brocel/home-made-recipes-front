import { Injectable } from '@angular/core';
import { MOCK_USERS } from '@mocks/data/users.mocks';
import { latency, MOCK_CURRENT_USER_ID } from '@mocks/utils/mock.constant';
import { User } from '@models/user/user';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockUserApiService {
  private users: User[] = structuredClone(MOCK_USERS);

  getUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(latency));
  }

  getUserById(id: string): Observable<User> {
    const user = this.users.find((u) => u.id === id);
    return user ? of(user).pipe(delay(latency)) : throwError(() => new Error('User not found'));
  }

  getCurrentUser(): Observable<User> {
    return this.getUserById(MOCK_CURRENT_USER_ID);
  }
}
