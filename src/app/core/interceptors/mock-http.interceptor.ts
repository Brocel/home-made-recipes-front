import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { matchRoute } from '@app/mocks/router/mock-router';
import { MOCK_ROUTES } from '@app/mocks/routes/routes';
import { environment } from '@env/environment';
import { MockApiService } from '@mocks/services/mock-api.service';

export const MockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMock) {
    return next(req);
  }

  if (!req.url.startsWith(environment.apiBase)) {
    return next(req);
  }

  const mockApi = inject(MockApiService);
  const cleanUrl = req.url.replace(environment.apiBase, '');

  const result = matchRoute(req, MOCK_ROUTES, cleanUrl, mockApi);

  if (result) return result;

  return next(req);
};
