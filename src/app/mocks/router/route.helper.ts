import { HttpResponse } from '@angular/common/http';
import { Injector, Type } from '@angular/core';
import { MockRoute } from '@mocks/router/mock-route.model';
import { map, Observable } from 'rxjs';

export function createCrudRoutes<TService>(
  basePath: string,
  Service: Type<TService>,
  handlers: {
    getAll: (s: TService) => Observable<any>;
    getById?: (s: TService, id: number) => Observable<any>;
    getByName?: (s: TService, name: string) => Observable<any>;
    create?: (s: TService, body: any) => Observable<any>;
    update?: (s: TService, id: number, body: any) => Observable<any>;
    delete?: (s: TService, id: number) => Observable<any>;
  },
): MockRoute[] {
  return [
    // GET ALL
    {
      method: 'GET',
      path: new RegExp(`^${basePath}$`),
      handler: (req, _, injector: Injector) => {
        const service = injector.get(Service);
        return handlers
          .getAll(service)
          .pipe(map((data) => new HttpResponse({ status: 200, body: data })));
      },
    },

    // GET BY ID
    {
      method: 'GET',
      path: new RegExp(`^${basePath}\/(?<id>\\d+)$`),
      handler: (req, params, injector: Injector) => {
        const service = injector.get(Service);
        const id = Number(params['id']);

        return handlers.getById!(service, id).pipe(
          map((data) => new HttpResponse({ status: 200, body: data })),
        );
      },
    },

    // CREATE
    {
      method: 'POST',
      path: new RegExp(`^${basePath}$`),
      handler: (req, _, injector: Injector) => {
        const service = injector.get(Service);

        return handlers.create!(service, req.body).pipe(
          map((data) => new HttpResponse({ status: 201, body: data })),
        );
      },
    },

    // UPDATE
    {
      method: 'PUT',
      path: new RegExp(`^${basePath}\/(?<id>\\d+)$`),
      handler: (req, params, injector: Injector) => {
        const service = injector.get(Service);
        const id = Number(params['id']);

        return handlers.update!(service, id, req.body).pipe(
          map((data) => new HttpResponse({ status: 200, body: data })),
        );
      },
    },

    // DELETE
    {
      method: 'DELETE',
      path: new RegExp(`^${basePath}\/(?<id>\\d+)$`),
      handler: (req, params, injector: Injector) => {
        const service = injector.get(Service);
        const id = Number(params['id']);

        return handlers.delete!(service, id).pipe(map(() => new HttpResponse({ status: 204 })));
      },
    },
  ];
}
