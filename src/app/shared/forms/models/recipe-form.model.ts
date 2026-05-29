import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IngredientType } from '@models/recipes/ingredient-type.enum';
import { RecipeDTO } from '@models/recipes/recipe';
import { RecipeType } from '@models/recipes/recipe-type.enum';
import { Unit } from '@models/recipes/unit.enum';

// =========================================================
// Data Type (for DTOs)
// =========================================================
/**
 * Recipe form data model (DTO without author field).
 * Used for form values and API payloads.
 */
export type RecipeFormModel = Omit<RecipeDTO, 'author'>;

export interface RecipeSearchFormModel {
  title: string | null;
  recipe_type: RecipeType[] | [] | null;
  max_prep_time: number | null;
  ingredient_type: IngredientType[] | [] | null;
}

// =========================================================
// FormGroup Interfaces (for type-safe FormBuilder.group())
// =========================================================

/**
 * Product sub-form controls (nested in ingredient).
 * Represents the product selected in an ingredient.
 */
export interface ProductFormGroup {
  id: FormControl<number | null>;
  name: FormControl<string>;
  ingredient_type: FormControl<IngredientType | null>;
}

/**
 * Ingredient sub-form controls (array items in recipe).
 * Represents a single ingredient in the recipe.
 */
export interface IngredientFormGroup {
  quantity: FormControl<number>;
  unit: FormControl<Unit | null>;
  product: FormGroup<ProductFormGroup>;
}

/**
 * Step sub-form controls (array items in recipe).
 * Represents a single preparation step in the recipe.
 */
export interface StepFormGroup {
  description: FormControl<string>;
  order: FormControl<number>;
}

/**
 * Recipe form controls (main form).
 * Root FormGroup type for recipe creation/editing.
 *
 * @example
 * const form: FormGroup<RecipeFormGroup> = this.recipeFormService.createForm();
 * form.controls.title.value  // ← Type-safe: string
 * form.controls.ingredient_list  // ← Type-safe: FormArray<FormGroup<IngredientFormGroup>>
 */
export interface RecipeFormGroup {
  title: FormControl<string>;
  description: FormControl<string>;
  preparation_time: FormControl<number>;
  recipe_type: FormControl<RecipeType | null>;
  ingredient_list: FormArray<FormGroup<IngredientFormGroup>>;
  step_list: FormArray<FormGroup<StepFormGroup>>;
}
