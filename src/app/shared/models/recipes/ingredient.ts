import { IngredientType } from './ingredient-type.enum';
import { Unit } from './unit.enum';

export interface Ingredient {
  id: number;
  quantity: number;
  unit: Unit;
  product: Product;
}

export interface IngredientDTO {
  quantity: number;
  unit: Unit;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  ingredient_type: IngredientType;
}

export interface ProductDTO {
  name: string;
  ingredient_type: IngredientType;
}
