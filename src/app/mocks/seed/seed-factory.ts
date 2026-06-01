// -----------------------
// Internal counters

import { Ingredient } from '@models/recipes/ingredient';
import { Recipe } from '@models/recipes/recipe';
import { RecipeType } from '@models/recipes/recipe-type.enum';
import { Step } from '@models/recipes/step';
import { Unit } from '@models/recipes/unit.enum';
import { User } from '@models/user/user';
import { getProductByName } from './seed-resolvers';

// -----------------------
let recipeId = 1;
let ingredientId = 1;
let stepId = 1;

export function createIngredient(quantity: number, unit: Unit, productName: string): Ingredient {
  return {
    id: ingredientId++,
    quantity,
    unit,
    product: getProductByName(productName),
  };
}

export function createSteps(descriptions: string[]): Step[] {
  return descriptions.map((desc, index) => ({
    id: stepId++,
    description: desc,
    order: index + 1,
  }));
}

export function createRecipe(params: {
  title: string;
  description: string;
  preparation_time: number;
  recipe_type: RecipeType;
  author: User;
  ingredients: Ingredient[];
  steps: Step[];
}): Recipe {
  return {
    id: recipeId++,
    title: params.title,
    description: params.description,
    preparation_time: params.preparation_time,
    recipe_type: params.recipe_type,
    publication_date: new Date().toISOString(),
    author: params.author,
    ingredient_list: params.ingredients,
    step_list: params.steps,
  };
}
