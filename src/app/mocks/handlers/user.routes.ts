import { HttpResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { MockRoute } from '@mocks/router/mock-route.model';
import { MockUserApiService } from '@mocks/services/mock-user-api.service';
import { User } from '@models/user/user';
import { map } from 'rxjs/operators';

export const USER_ROUTES: MockRoute[] = [
  {
    method: 'GET',
    path: /^\/auth\/me$/,
    handler: (req, _, injector: Injector) => {
      const userApi = injector.get(MockUserApiService);

      return userApi.getCurrentUser().pipe(
        map(
          (data: User) =>
            new HttpResponse({
              status: 200,
              body: data,
            }),
        ),
      );
    },
  },
];
