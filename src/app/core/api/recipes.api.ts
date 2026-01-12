import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@env/environment';
import { Recipe } from '@shared/models/recipes/recipe';
import { ListParams } from '@models/request/list-params';
import { PagedResponse } from '@models/response/paged-response';

@Injectable({ providedIn: 'root' })
export class RecipesApi {
  private readonly apiBase = environment.apiBase ?? '/api';
  private readonly base = `${this.apiBase}/recipes`;

  constructor(private http: HttpClient) {}

  list(params?: ListParams): Observable<PagedResponse<Recipe>> {
    let httpParams = new HttpParams();
    if (params?.page != null) httpParams = httpParams.set('page', String(params.page));
    if (params?.pageSize != null) httpParams = httpParams.set('pageSize', String(params.pageSize));
    if (params?.q) httpParams = httpParams.set('q', params.q);
    if (params?.authorId) httpParams = httpParams.set('authorId', params.authorId);

    return this.http.get<{ items?: Recipe[]; total?: number; page?: number; pageSize?: number }>(this.base, { params: httpParams })
      .pipe(
        map(resp => ({
          items: resp.items ?? [],
          total: resp.total ?? 0,
          page: resp.page ?? params?.page ?? 1,
          pageSize: resp.pageSize ?? params?.pageSize ?? (resp.items ? resp.items.length : 0)
        })),
        catchError(this.handleError)
      );
  }

  dailyRecipe(): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.base}/dailyRecipe`)
      .pipe(catchError(this.handleError));
  }

  get(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.base}/${encodeURIComponent(id)}`)
      .pipe(catchError(this.handleError));
  }

  create(payload: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(this.base, payload)
      .pipe(catchError(this.handleError));
  }

  update(id: string, payload: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.base}/${encodeURIComponent(id)}`, payload)
      .pipe(catchError(this.handleError));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${encodeURIComponent(id)}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('RecipesApi error', { status: error.status, url: error.url, error: error.error });
    let message = 'Une erreur est survenue lors de la communication avec le serveur.';
    if (error.status === 0) message = 'Impossible de contacter le serveur. Vérifie ta connexion.';
    else if (error.status >= 400 && error.status < 500) message = error.error?.message ?? 'Requête invalide ou non autorisée.';
    else if (error.status >= 500) message = 'Erreur serveur. Réessaie plus tard.';
    return throwError(() => ({ status: error.status, message, raw: error.error }));
  }
}
