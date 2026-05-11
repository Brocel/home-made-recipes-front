import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { environment } from '@env/environment';
import { matchRoute } from '@mocks/router/mock-router';
import { MOCK_ROUTES } from '@mocks/router/routes';

export const MockHttpInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.useMock) {
    return next(req);
  }

  if (!req.url.startsWith(environment.apiBase)) {
    return next(req);
  }

  const injector = inject(Injector);
  const cleanUrl = req.url.replace(environment.apiBase, '');

  const result = matchRoute(req, MOCK_ROUTES, cleanUrl, injector);

  if (result) return result;

  return next(req);
};
