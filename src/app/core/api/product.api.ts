import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductDTO } from '@models/recipes/ingredient';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductApi {
  constructor(private http: HttpClient) {}

  searchProducts(query: string): Observable<Product[]> {
    if (query.length < 3) return of([]);

    return this.http.get<Product[]>(`/api/products/search`, {
      params: { q: query },
    });
  }

  createProduct(dto: ProductDTO) {
    return this.http.post<Product>('/api/products', dto);
  }
}
