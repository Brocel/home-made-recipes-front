import { signal } from '@angular/core';
import { AuthResponse } from '@app/core/auth/auth.response';

export const currentUser = signal<AuthResponse | null>(null);

export const isAuthenticated = signal<boolean>(false);
