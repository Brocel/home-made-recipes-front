import { HttpRequest, HttpResponse } from '@angular/common/http';
import { MockApiService } from '@mocks/services/mock-api.service';
import { Observable } from 'rxjs';

export interface MockRoute {
  method: string;
  path: RegExp;
  handler: (
    req: HttpRequest<any>,
    params: Record<string, string>,
    mockApi: MockApiService,
  ) => Observable<HttpResponse<any>>;
}
