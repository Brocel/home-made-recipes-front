import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Product, ProductDTO } from '@models/recipes/ingredient';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private readonly apiBase = environment.apiBase;
  private readonly base = `${this.apiBase}/products`;

  // =========================================================
  // Dependencies
  // =========================================================
  private readonly http = inject(HttpClient);

  // =========================================================
  // API Methods
  // =========================================================

  /**
   * Search for products based on a query string.
   *
   * The search will only be performed if the query has at least 3 characters to avoid unnecessary API calls for short queries.
   * If the query is empty or has less than 3 characters, an empty array will be returned immediately.
   *
   * @param query The search query string.
   * @returns An observable of an array of products matching the query.
   */
  searchProducts(query: string): Observable<Product[]> {
    if (!query?.trim() || query.length < 3) return of([]);

    return this.http.get<Product[]>(`${this.base}/search`, {
      params: { q: query },
    });
  }

  /**
   * Create a new product.
   * @param dto The product data transfer object.
   * @returns An observable of the created product.
   */
  createProduct(dto: ProductDTO): Observable<Product> {
    return this.http.post<Product>(this.base, dto);
  }
}
