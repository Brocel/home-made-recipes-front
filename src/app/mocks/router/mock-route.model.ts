import { HttpRequest, HttpResponse } from '@angular/common/http';
import { MockApiService } from '@mocks/services/mock-api.service';
import { HttpMethod } from '@mocks/utils/mock.type';
import { Observable } from 'rxjs';

export interface MockRoute {
  method: HttpMethod;
  path: RegExp;
  handler: (
    req: HttpRequest<any>,
    params: Record<string, string>,
    mockApi: MockApiService,
  ) => Observable<HttpResponse<any>>;
}
