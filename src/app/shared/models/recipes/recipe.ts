import { User } from '../user';
import { Ingredient, IngredientDTO } from './ingredient';
import { RecipeType } from './recipe-type.enum';
import { Step, StepDTO } from './step';
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

export interface RecipeDTO {
  title: string;
  description: string;
  preparation_time: number;
  recipe_type: RecipeType;
  publication_date: string;
  ingredient_list: IngredientDTO[];
  step_list: StepDTO[];
}

export { RecipeType, IngredientType, Unit };
