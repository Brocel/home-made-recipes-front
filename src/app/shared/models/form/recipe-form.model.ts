import { RecipeDTO } from '../recipes/recipe';

export type RecipeFormModel = Omit<RecipeDTO, 'author'>;
