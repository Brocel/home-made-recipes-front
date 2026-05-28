/**
 * Type-safe field names for Recipe form
 */
export type RecipeField =
  | 'title'
  | 'description'
  | 'preparation_time'
  | 'recipe_type'
  | 'ingredient_list'
  | 'step_list';

/**
 * Type-safe field names for Ingredient form (nested in Recipe)
 */
export type IngredientField = 'quantity' | 'unit' | 'product';

/**
 * Type-safe field names for Product form (nested in Ingredient)
 */
export type ProductField = 'id' | 'name' | 'ingredient_type';

/**
 * Type-safe field names for Step form (nested in Recipe)
 */
export type StepField = 'description' | 'order';
