import { Injectable, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RecipeFormModel } from '@models/form/recipe-form.model';
import { IngredientType } from '@models/recipes/ingredient-type.enum';
import { RecipeType } from '@models/recipes/recipe-type.enum';
import { Unit } from '@models/recipes/unit.enum';

@Injectable({ providedIn: 'root' })
export class RecipeFormService {
  private fb = inject(FormBuilder);
  private form!: FormGroup;

  createForm() {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      preparation_time: [0],
      recipe_type: [null as RecipeType | null],
      ingredient_list: this.fb.array([]),
      step_list: this.fb.array([]),
    });

    return this.form;
  }

  get recipeForm() {
    return this.form;
  }

  // Ingredients

  addIngredient(): void {
    this.ingredientsArray.push(this.createIngredient());
  }

  get ingredientsArray() {
    return this.form.get('ingredient_list') as FormArray;
  }

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

  addStep() {
    this.stepsArray.push(this.createStep(this.stepsArray.length + 1));
  }

  get stepsArray() {
    return this.form.get('step_list') as FormArray;
  }

  createStep(order: number) {
    return this.fb.group({
      description: [''],
      order: [order],
    });
  }

  toDto(): RecipeFormModel {
    return this.form.value as RecipeFormModel;
  }

  patchStateValue(state: { title?: string; recipe_type?: RecipeType }): void {
    this.form.patchValue({ title: state.title ?? '', recipe_type: state.recipe_type ?? null });
  }
}
