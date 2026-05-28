import { Injectable, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IngredientType } from '@models/recipes/ingredient-type.enum';
import { RecipeType } from '@models/recipes/recipe-type.enum';
import { Unit } from '@models/recipes/unit.enum';
import { RecipeFormModel } from '../forms/models/recipe-form.model';

@Injectable({ providedIn: 'root' })
export class RecipeFormService {
  private readonly fb = inject(FormBuilder);

  payload = signal<{ title?: string; recipe_type?: RecipeType } | null>(null);

  // =========================================================
  // Create form
  // =========================================================

  // Recipe
  createForm(): FormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
      preparation_time: [0],
      recipe_type: [null as RecipeType | null],
      ingredient_list: this.fb.array([]),
      step_list: this.fb.array([]),
    });
  }

  // Ingredients
  createIngredient(): FormGroup {
    return this.fb.group({
      quantity: [0],
      unit: [null as Unit | null],
      product: this.fb.group({
        id: [null],
        name: [''],
        ingredient_type: [null as IngredientType | null],
      }),
    });
  }

  // Steps
  createStep(order: number) {
    return this.fb.group({
      description: [''],
      order: [order],
    });
  }

  // =========================================================
  // Add elements
  // =========================================================

  // Ingredients
  addIngredient(ingredientList: FormArray): void {
    ingredientList.push(this.createIngredient());
  }

  // Steps
  addStep(stepList: FormArray): void {
    stepList.push(this.createStep(stepList.length + 1));
  }

  // =========================================================
  // Helpers
  // =========================================================
  toDto(form: FormGroup): RecipeFormModel {
    return form.value as RecipeFormModel;
  }

  patchStateValue(form: FormGroup, state: { title?: string; recipe_type?: RecipeType }): void {
    form.patchValue({ title: state.title ?? '', recipe_type: state.recipe_type ?? null });
  }

  setPayload(data: { title?: string; recipe_type?: RecipeType }) {
    this.payload.set(data);
  }

  clearPayload() {
    this.payload.set(null);
  }
}
