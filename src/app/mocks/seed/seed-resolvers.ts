import { MOCK_PRODUCTS } from '@mocks/data/products.mock';
import { Product } from '@models/recipes/ingredient';
import { User } from '@models/user/user';

export function getProductByName(name: string): Product {
  const product = MOCK_PRODUCTS.find((p) => p.name === name);
  if (!product) {
    throw new Error(`Product not found: ${name}`);
  }
  return product;
}

export function getUserByIndex(users: User[], index: number): User {
  return users[index];
}
