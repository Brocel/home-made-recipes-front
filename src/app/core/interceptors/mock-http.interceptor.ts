import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { matchRoute } from '@app/mocks/router/mock-router';
import { MOCK_ROUTES } from '@app/mocks/router/routes';
import { environment } from '@env/environment';

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
