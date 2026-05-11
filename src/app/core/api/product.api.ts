import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Product, ProductDTO } from '@models/recipes/ingredient';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  private readonly apiBase = environment.apiBase;
  private readonly base = `${this.apiBase}/products`;

  private http = inject(HttpClient);

  searchProducts(query: string): Observable<Product[]> {
    if (query.length < 3) return of([]);

    return this.http.get<Product[]>(`${this.base}/search`, {
      params: { q: query },
    });
  }

  createProduct(dto: ProductDTO) {
    return this.http.post<Product>(this.base, dto);
  }
}
