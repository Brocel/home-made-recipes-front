import { createCrudRoutes } from '@mocks/router/route.helper';
import { MockProductApiService } from '@mocks/services/mock-product-api.service';

export const PRODUCT_ROUTES = [
  ...createCrudRoutes('/products', MockProductApiService, {
    getAll: (s) => s.getProducts(),
    create: (s, body) => s.createProduct(body),
    getByName: (s, name) => s.searchProducts(name),
  }),
];
