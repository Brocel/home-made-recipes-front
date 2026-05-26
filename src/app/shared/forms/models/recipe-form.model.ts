import { RecipeDTO } from '@models/recipes/recipe';

export type RecipeFormModel = Omit<RecipeDTO, 'author'>;
