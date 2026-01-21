import { User } from '../user';
import { Ingredient } from './ingredient';
import { RecipeType } from './recipe-type.enum';
import { Step } from './step';
import { IngredientType } from './ingredient-type.enum';
import { Unit } from './unit.enum';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  preparation_time: number;
  recipe_type: RecipeType;
  publication_date: string;
  author: User;
  ingredient_list: Ingredient[];
  step_list: Step[];
}

export { RecipeType, IngredientType, Unit };
