import { HttpResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { MockRoute } from '@mocks/router/mock-route.model';
import { map } from 'rxjs/operators';
import { MockAuthApiService } from '../services/mock-auth-api.service';

export const AUTH_ROUTES: MockRoute[] = [
  {
    method: 'POST',
    path: /^\/auth\/login$/,
    handler: (req, _, injector: Injector) => {
      const authApi = injector.get(MockAuthApiService);

      const body = req.body as {
        email: string;
        password: string;
      };

      return authApi.login(body.email).pipe(
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
    handler: (_req, _params, injector: Injector) => {
      const authApi = injector.get(MockAuthApiService);

      return authApi.logout().pipe(
        map(
          () =>
            new HttpResponse({
              status: 204,
            }),
        ),
      );
    },
  },
];
