import { HttpResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { inject } from '@angular/core';
import { MockRoute } from '@mocks/router/mock-route.model';
import { MockUserApiService } from '@mocks/services/mock-user-api.service';
import { User } from '@models/user';

const userApi = inject(MockUserApiService);

export const USER_ROUTES: MockRoute[] = [
  {
    method: 'GET',
    path: /^\/auth\/me$/,
    handler: (req) =>
      userApi.getCurrentUser().pipe(
        map(
          (data: User) =>
            new HttpResponse({
              status: 200,
              body: data,
            }),
        ),
      ),
  },
];
