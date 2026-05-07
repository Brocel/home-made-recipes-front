import { Product } from '@app/shared/models/recipes/ingredient';
import { Recipe } from '@app/shared/models/recipes/recipe';
import { User } from '@app/shared/models/user';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Db = {
  users: User[];
  recipes: Recipe[];
  products: Product[];
};
