import { IngredientType } from './ingredient-type.enum';
import { Unit } from './unit.enum';

export interface Ingredient {
  id: number;
  quantity: number;
  unit: Unit;
  product: Product;
}

export type IngredientDTO = Omit<Ingredient, 'id'>;

export interface Product {
  id: number;
  name: string;
  ingredient_type: IngredientType;
}

export type ProductDTO = Omit<Product, 'id'>;
