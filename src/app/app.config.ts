import 'zone.js';

import {
  ApplicationConfig,
  importProvidersFrom,
  Injectable,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '@interceptors/auth.interceptor';
import { MockHttpInterceptor } from '@interceptors/mock-http.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { routes } from './app.routes';

@Injectable()
export class HttpTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([MockHttpInterceptor, AuthInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: HttpTranslateLoader },
      }),
    ),
  ],
};
