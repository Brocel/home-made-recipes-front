import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { IngredientDTO } from '@models/recipes/ingredient';
import { Unit } from '@models/recipes/unit.enum';
import { IngredientRow } from './ingredient-row/ingredient-row';

@Component({
  selector: 'app-recipe-ingredients',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, IngredientRow],
  templateUrl: './recipe-ingredients.html',
  styleUrls: ['./recipe-ingredients.scss'],
})
export class RecipeIngredients {
  @Input({ required: true }) formArray!: FormArray<FormGroup>;

  get ingredientsControls() {
    return this.formArray.controls as FormGroup[];
  }

  addIngredient() {
    const group = new FormGroup({
      quantity: new FormControl<number | null>(null),
      unit: new FormControl<Unit | null>(null),
      product: new FormControl(null),
    });

    this.formArray.push(group);
  }

  removeIngredient(index: number) {
    this.formArray.removeAt(index);
  }
}
