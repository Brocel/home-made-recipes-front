import { HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { inject } from '@angular/core';
import { MockRoute } from '@mocks/router/mock-route.model';
import { MockAuthApiService } from '../services/mock-auth-api.service';

const authApi = inject(MockAuthApiService);

export const AUTH_ROUTES: MockRoute[] = [
  {
    method: 'POST',
    path: /^\/auth\/login$/,
    handler: (req) => {
      const body = req.body as {
        username: string;
        password: string;
      };

      return authApi.login(body.username).pipe(
        map(
          (data) =>
            new HttpResponse({
              status: 200,
              body: data,
            }),
        ),
      );
    },
  },

  {
    method: 'POST',
    path: /^\/auth\/logout$/,
    handler: (req) =>
      authApi.logout().pipe(
        map(
          () =>
            new HttpResponse({
              status: 204,
            }),
        ),
      ),
  },
];
