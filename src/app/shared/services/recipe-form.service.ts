import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RecipeType } from '../models/recipes/recipe-type.enum';
import { IngredientType } from '../models/recipes/ingredient-type.enum';
import { Recipe } from '../models/recipes/recipe';
import { Unit } from '../models/recipes/unit.enum';

@Injectable({ providedIn: 'root' })
export class RecipeFormService {
  constructor(private fb: FormBuilder) {}

  createForm() {
    return this.fb.group({
      title: [''],
      description: [''],
      preparation_time: [0],
      recipe_type: [null as RecipeType | null],
      ingredient_list: this.fb.array([]),
      step_list: this.fb.array([]),
    });
  }

  addIngredient(form: FormGroup) {
    const ingredients = form.get('ingredient_list') as FormArray;
    ingredients.push(this.createIngredient());
  }

  createIngredient() {
    return this.fb.group({
      id: [null],
      quantity: [0],
      unit: [null as Unit | null],
      product: this.fb.group({
        id: [null],
        name: [''],
        ingredient_type: [null as IngredientType | null],
      }),
    });
  }

  addStep(form: FormGroup) {
    const steps = form.get('step_list') as FormArray;
    steps.push(this.createStep(steps.length + 1));
  }

  createStep(order: number) {
    return this.fb.group({
      id: [null],
      description: [''],
      order: [order],
    });
  }

  toDto(form: FormGroup): Recipe {
    return form.value as Recipe;
  }
}
