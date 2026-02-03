import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductDTO } from '@models/recipes/ingredient';

@Injectable({ providedIn: 'root' })
export class ProductService {
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
