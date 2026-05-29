import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Recipe } from '@models/recipes/recipe';
import { ListParams } from '@models/request/list-params';
import { PagedResponse } from '@models/response/paged-response';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { handleError } from './api.util';

@Injectable({ providedIn: 'root' })
export class RecipesApi {
  private readonly apiBase = environment.apiBase ?? '/api';
  private readonly base = `${this.apiBase}/recipes`;

  // =========================================================
  // Dependencies
  // =========================================================
  private readonly http = inject(HttpClient);

  // =========================================================
  // API Methods
  // =========================================================

  /**
   * List recipes with optional filtering and pagination.
   * @param params The list parameters including pagination and filters.
   * @returns An observable of a paged response containing recipes.
   */
  list(params?: ListParams): Observable<PagedResponse<Recipe>> {
    let httpParams = new HttpParams();
    if (params?.page != null) httpParams = httpParams.set('page', String(params.page));
    if (params?.pageSize != null) httpParams = httpParams.set('pageSize', String(params.pageSize));
    if (params?.q) httpParams = httpParams.set('q', params.q);
    if (params?.authorId) httpParams = httpParams.set('authorId', params.authorId);

    return this.http
      .get<{
        items?: Recipe[];
        total?: number;
        page?: number;
        pageSize?: number;
      }>(this.base, { params: httpParams })
      .pipe(
        map((resp) => ({
          items: resp.items ?? [],
          total: resp.total ?? 0,
          page: resp.page ?? params?.page ?? 1,
          pageSize: resp.pageSize ?? params?.pageSize ?? (resp.items ? resp.items.length : 0),
        })),
        catchError((error) => handleError('RecipesApi', error)),
      );
  }

  /**
   * Get the daily recipe.
   * @returns An observable of the daily recipe.
   */
  dailyRecipe(): Observable<Recipe> {
    return this.http
      .get<Recipe>(`${this.base}/daily`)
      .pipe(catchError((error) => handleError('RecipesApi', error)));
  }

  /**
   * Get a recipe by its ID.
   * @param id The ID of the recipe.
   * @returns An observable of the recipe.
   */
  get(id: string): Observable<Recipe> {
    return this.http
      .get<Recipe>(`${this.base}/${encodeURIComponent(id)}`)
      .pipe(catchError((error) => handleError('RecipesApi', error)));
  }

  /**
   * Create a new recipe.
   * @param payload The partial recipe data.
   * @returns An observable of the created recipe.
   */
  create(payload: Partial<Recipe>): Observable<Recipe> {
    return this.http
      .post<Recipe>(this.base, payload)
      .pipe(catchError((error) => handleError('RecipesApi', error)));
  }

  /**
   * Update an existing recipe.
   * @param id The ID of the recipe.
   * @param payload The partial recipe data.
   * @returns An observable of the updated recipe.
   */
  update(id: string, payload: Partial<Recipe>): Observable<Recipe> {
    return this.http
      .put<Recipe>(`${this.base}/${encodeURIComponent(id)}`, payload)
      .pipe(catchError((error) => handleError('RecipesApi', error)));
  }

  /**
   * Delete a recipe by its ID.
   * @param id The ID of the recipe.
   * @returns An observable of void.
   */
  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.base}/${encodeURIComponent(id)}`)
      .pipe(catchError((error) => handleError('RecipesApi', error)));
  }
}
