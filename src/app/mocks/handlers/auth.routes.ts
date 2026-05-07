import { HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { MockRoute } from '@mocks/router/mock-route.model';
import { User } from '@models/user';

export const AUTH_ROUTES: MockRoute[] = [
  {
    method: 'POST',
    path: /^\/auth\/login$/,
    handler: (req, _, mockApi) => {
      const body = req.body as {
        username: string;
        password: string;
      };

      return mockApi.login(body.username).pipe(
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
    method: 'GET',
    path: /^\/auth\/me$/,
    handler: (_, __, mockApi) =>
      mockApi.getCurrentUser().pipe(
        map(
          (data: User) =>
            new HttpResponse({
              status: 200,
              body: data,
            }),
        ),
      ),
  },

  {
    method: 'POST',
    path: /^\/auth\/logout$/,
    handler: (_, __, mockApi) =>
      mockApi.logout().pipe(
        map(
          () =>
            new HttpResponse({
              status: 204,
            }),
        ),
      ),
  },
];
