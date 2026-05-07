import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ProductDTO } from '@app/shared/models/recipes/ingredient';
import { map } from 'rxjs';
import { MockRoute } from '../router/mock-route.model';
import { MockProductApiService } from '../services/mock-product-api.service';

const productApi = inject(MockProductApiService);

export const PRODUCT_ROUTES: MockRoute[] = [
  {
    method: 'GET',
    path: /^\/products\/search$/,
    handler: (req) => {
      const query = req.params.get('q') ?? '';

      return productApi.searchProducts(query).pipe(
        map(
          (data) =>
            new HttpResponse({
              status: 200,
              body: data,
            }),
        ),
      );
    },
  },

  {
    method: 'POST',
    path: /^\/products$/,
    handler: (req) => {
      const productApi = inject(MockProductApiService);

      return productApi.createProduct(req.body as ProductDTO).pipe(
        map(
          (data) =>
            new HttpResponse({
              status: 201,
              body: data,
            }),
        ),
      );
    },
  },
];
