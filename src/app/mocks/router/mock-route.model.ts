import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpMethod } from '@mocks/utils/mock.type';
import { Observable } from 'rxjs';

export interface MockRoute {
  method: HttpMethod;
  path: RegExp;
  handler: (req: HttpRequest<any>, params: Record<string, string>) => Observable<HttpResponse<any>>;
}
