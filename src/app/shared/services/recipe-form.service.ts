import { Injectable, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientType } from '@models/recipes/ingredient-type.enum';
import { RecipeType } from '@models/recipes/recipe-type.enum';
import { Unit } from '@models/recipes/unit.enum';
import {
  IngredientFormGroup,
  RecipeFormGroup,
  RecipeFormModel,
  StepFormGroup,
} from '../forms/models/recipe-form.model';

@Injectable({ providedIn: 'root' })
export class RecipeFormService {
  private readonly fb = inject(FormBuilder);

  payload = signal<{ title?: string; recipe_type?: RecipeType } | null>(null);

  // =========================================================
  // Create form
  // =========================================================

  /**
   * Create a new recipe form with proper type safety.
   * All controls are typed for IDE autocomplete and validation.
   */
  createForm(): FormGroup<RecipeFormGroup> {
    return this.fb.nonNullable.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      preparation_time: [0, [Validators.required, Validators.min(1)]],
      recipe_type: [null as RecipeType | null, Validators.required],
      ingredient_list: this.fb.nonNullable.array<FormGroup<IngredientFormGroup>>([]),
      step_list: this.fb.nonNullable.array<FormGroup<StepFormGroup>>([]),
    }) as FormGroup<RecipeFormGroup>;
  }

  /**
   * Create a new ingredient form with proper type safety.
   * Includes nested product form with its own validations.
   */
  createIngredient(): FormGroup<IngredientFormGroup> {
    return this.fb.nonNullable.group({
      quantity: [0, [Validators.required, Validators.min(0.01)]],
      unit: [null as Unit | null, Validators.required],
      product: this.fb.nonNullable.group({
        id: [null as number | null],
        name: ['', Validators.required],
        ingredient_type: [null as IngredientType | null, Validators.required],
      }),
    }) as FormGroup<IngredientFormGroup>;
  }

  /**
   * Create a new step form with proper type safety.
   * Order is pre-filled based on the array length.
   */
  createStep(order: number): FormGroup<StepFormGroup> {
    return this.fb.nonNullable.group({
      description: ['', Validators.required],
      order: [order],
    }) as FormGroup<StepFormGroup>;
  }

  // =========================================================
  // Add elements
  // =========================================================

  /**
   * Add a new ingredient to the ingredient list array.
   * Automatically creates a typed ingredient form.
   */
  addIngredient(ingredientList: FormArray<FormGroup<IngredientFormGroup>>): void {
    ingredientList.push(this.createIngredient());
  }

  /**
   * Add a new step to the step list array.
   * Automatically creates a typed step form with correct order.
   */
  addStep(stepList: FormArray<FormGroup<StepFormGroup>>): void {
    stepList.push(this.createStep(stepList.length + 1));
  }

  // =========================================================
  // Helpers
  // =========================================================

  /**
   * Convert form value to DTO.
   * Type-safe conversion from form to API payload.
   */
  toDto(form: FormGroup<RecipeFormGroup>): RecipeFormModel {
    return form.value as RecipeFormModel;
  }

  /**
   * Patch form with state values.
   * Only updates specific fields without touching the rest.
   */
  patchStateValue(
    form: FormGroup<RecipeFormGroup>,
    state: { title?: string; recipe_type?: RecipeType },
  ): void {
    form.patchValue({ title: state.title ?? '', recipe_type: state.recipe_type ?? null });
  }

  /**
   * Set payload signal (used for form prefilling).
   */
  setPayload(data: { title?: string; recipe_type?: RecipeType }) {
    this.payload.set(data);
  }

  /**
   * Clear payload signal.
   */
  clearPayload() {
    this.payload.set(null);
  }
}
