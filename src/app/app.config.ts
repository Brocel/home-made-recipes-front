import { ApplicationConfig, Injectable, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideTranslateLoader, TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {
  }

  getTranslation(lang: string): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(`/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateLoader(HttpTranslateLoader)
  ]
};
