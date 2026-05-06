import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { MOCK_RECIPES } from '@mocks/recipes.mock';

export const MockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Mock disabled → pass through
  if (!environment.useMock) {
    return next(req);
  }

  // 2. Only intercept backend API
  if (!req.url.includes('/hmr/api/')) {
    return next(req);
  }

  // 3. GET /recipes
  if (req.method === 'GET' && req.url.endsWith('/recipes')) {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          items: MOCK_RECIPES,
          total: MOCK_RECIPES.length,
          page: 1,
          pageSize: MOCK_RECIPES.length,
        },
      }),
    ).pipe(delay(300));
  }

  // 4. GET /recipes/daily
  if (req.method === 'GET' && req.url.endsWith('/recipes/daily')) {
    return of(
      new HttpResponse({
        status: 200,
        body: MOCK_RECIPES[0],
      }),
    ).pipe(delay(300));
  }

  // fallback → real request
  return next(req);
};
