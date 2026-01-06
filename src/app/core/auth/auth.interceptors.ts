// Interceptor HTTP global
// Ici on force l'envoi de withCredentials pour toutes les requêtes HTTP
// afin que les cookies de session (si utilisés par le backend) soient transmis.

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone la requête pour ajouter withCredentials
    // On évite de modifier les headers Authorization ici car on suppose cookie-based session.
    const cloned = req.clone({ withCredentials: true });
    return next.handle(cloned);
  }
}
