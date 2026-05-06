import { HttpRequest } from '@angular/common/http';
import { MockApiService } from '@mocks/services/mock-api.service';
import { Observable } from 'rxjs';
import { MockRoute } from './mock-route.model';

export function matchRoute(
  req: HttpRequest<any>,
  routes: MockRoute[],
  cleanUrl: string,
  mockApi: MockApiService,
): Observable<any> | null {
  for (const route of routes) {
    if (req.method !== route.method) continue;

    const match = cleanUrl.match(route.path);
    if (!match) continue;

    const params: Record<string, string> = {};

    // extract named groups if any
    if (match.groups) {
      Object.assign(params, match.groups);
    }

    return route.handler(req, params, mockApi);
  }

  return null;
}
