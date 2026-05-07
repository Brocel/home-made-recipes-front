import { Injectable } from '@angular/core';
import { MOCK_PRODUCTS } from '@mocks/data/products.mock';
import { Product, ProductDTO } from '@models/recipes/ingredient';
import { delay, Observable, of } from 'rxjs';
import { nextId } from '../utils/api.util';
import { latency } from '../utils/mock.constant';

@Injectable({ providedIn: 'root' })
export class MockProductApiService {
  private products: Product[] = structuredClone(MOCK_PRODUCTS);

  searchProducts(query: string): Observable<Product[]> {
    const normalized = query.toLowerCase();

    const results = this.products.filter((product) =>
      product.name.toLowerCase().includes(normalized),
    );

    return of(results).pipe(delay(latency));
  }

  createProduct(dto: ProductDTO): Observable<Product> {
    const newProduct: Product = {
      ...dto,
      id: nextId(this.products),
    };

    this.products.push(newProduct);

    return of(newProduct).pipe(delay(latency));
  }
}
