import {
  IngredientField,
  ProductField,
  RecipeField,
  StepField,
} from '@forms/constants/recipe.fields';
import { FormValidationMessages } from '@forms/types/validation.type';

/**
 * Validation messages for Recipe Create/Edit form.
 * Maps form field names to error message translation keys.
 * Covers title, description, prep_time, recipe_type, and arrays (ingredient_list, step_list).
 *
 * @example
 * {
 *   title: {
 *     required: 'form.validation.recipeTitleRequired',
 *   },
 *   description: {
 *     required: 'form.validation.recipeDescriptionRequired',
 *   },
 *   // ... other fields
 * }
 */
export const RECIPE_VALIDATION_MESSAGES = {
  title: {
    required: 'form.validation.recipeTitleRequired',
  },
  description: {
    required: 'form.validation.recipeDescriptionRequired',
  },
  preparation_time: {
    required: 'form.validation.recipePrepTimeRequired',
    min: 'form.validation.recipePrepTimeMin',
  },
  recipe_type: {
    required: 'form.validation.recipeTypeRequired',
  },
  ingredient_list: {
    required: 'form.validation.recipeIngredientListRequired',
  },
  step_list: {
    required: 'form.validation.recipeStepListRequired',
  },
} satisfies FormValidationMessages<RecipeField>;

/**
 * Validation messages for Ingredient sub-form (nested in Recipe).
 * Used when editing individual ingredients in the recipe.
 */
export const INGREDIENT_VALIDATION_MESSAGES = {
  quantity: {
    required: 'form.validation.ingredientQuantityRequired',
    min: 'form.validation.ingredientQuantityMin',
  },
  unit: {
    required: 'form.validation.ingredientUnitRequired',
  },
  product: {
    required: 'form.validation.ingredientProductRequired',
  },
} satisfies FormValidationMessages<IngredientField>;

/**
 * Validation messages for Product sub-form (nested in Ingredient).
 * Used when editing product details within an ingredient.
 */
export const PRODUCT_INGREDIENT_VALIDATION_MESSAGES = {
  id: {
    required: 'form.validation.productIdRequired',
  },
  name: {
    required: 'form.validation.productNameRequired',
  },
  ingredient_type: {
    required: 'form.validation.ingredientTypeRequired',
  },
} satisfies FormValidationMessages<ProductField>;

/**
 * Validation messages for Step sub-form (nested in Recipe).
 * Used when editing individual steps in the recipe.
 */
export const STEP_VALIDATION_MESSAGES = {
  description: {
    required: 'form.validation.stepDescriptionRequired',
  },
  order: {
    required: 'form.validation.stepOrderRequired',
  },
} satisfies FormValidationMessages<StepField>;
