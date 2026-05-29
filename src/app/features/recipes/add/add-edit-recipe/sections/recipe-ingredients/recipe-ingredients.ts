import { Component, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { IngredientRow } from './ingredient-row/ingredient-row';

@Component({
  selector: 'app-recipe-ingredients',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, IngredientRow],
  templateUrl: './recipe-ingredients.html',
  styleUrls: ['./recipe-ingredients.scss'],
})
export class RecipeIngredients {
  // =========================================================
  // Inputs
  // =========================================================
  readonly ingredients = input.required<FormArray<FormGroup>>();
  readonly submitted = input(false);

  // =========================================================
  // Outputs
  // =========================================================
  readonly removeIngredient = output<number>();
  readonly addIngredient = output<void>();

  get ingredientsControls(): FormGroup[] {
    return this.ingredients().controls as FormGroup[];
  }
}
