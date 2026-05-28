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
 *     required: 'form.validation.recipe_title_required',
 *   },
 *   description: {
 *     required: 'form.validation.recipe_description_required',
 *   },
 *   // ... other fields
 * }
 */
export const RECIPE_VALIDATION_MESSAGES = {
  title: {
    required: 'form.validation.recipe_title_required',
  },
  description: {
    required: 'form.validation.recipe_description_required',
  },
  preparation_time: {
    required: 'form.validation.recipe_prep_time_required',
    min: 'form.validation.recipe_prep_time_min',
  },
  recipe_type: {
    required: 'form.validation.recipe_type_required',
  },
  ingredient_list: {
    required: 'form.validation.recipe_ingredient_list_required',
  },
  step_list: {
    required: 'form.validation.recipe_step_list_required',
  },
} satisfies FormValidationMessages<RecipeField>;

/**
 * Validation messages for Ingredient sub-form (nested in Recipe).
 * Used when editing individual ingredients in the recipe.
 */
export const INGREDIENT_VALIDATION_MESSAGES = {
  quantity: {
    required: 'form.validation.ingredient_quantity_required',
    min: 'form.validation.ingredient_quantity_min',
  },
  unit: {
    required: 'form.validation.ingredient_unit_required',
  },
  product: {
    required: 'form.validation.ingredient_product_required',
  },
} satisfies FormValidationMessages<IngredientField>;

/**
 * Validation messages for Product sub-form (nested in Ingredient).
 * Used when editing product details within an ingredient.
 */
export const PRODUCT_INGREDIENT_VALIDATION_MESSAGES = {
  id: {
    required: 'form.validation.product_id_required',
  },
  name: {
    required: 'form.validation.product_name_required',
  },
  ingredient_type: {
    required: 'form.validation.ingredient_type_required',
  },
} satisfies FormValidationMessages<ProductField>;

/**
 * Validation messages for Step sub-form (nested in Recipe).
 * Used when editing individual steps in the recipe.
 */
export const STEP_VALIDATION_MESSAGES = {
  description: {
    required: 'form.validation.step_description_required',
  },
  order: {
    required: 'form.validation.step_order_required',
  },
} satisfies FormValidationMessages<StepField>;
