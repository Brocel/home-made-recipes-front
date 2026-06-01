import { UserProfile } from '@models/user/user-profile';
import { Ingredient } from './ingredient';
import { IngredientType } from './ingredient-type.enum';
import { RecipeType } from './recipe-type.enum';
import { Step } from './step';
import { Unit } from './unit.enum';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  preparation_time: number;
  recipe_type: RecipeType;
  publication_date: string;
  author: UserProfile;
  ingredient_list: Ingredient[];
  step_list: Step[];
}

export type RecipeDTO = Omit<Recipe, 'id'>;

export { IngredientType, RecipeType, Unit };
