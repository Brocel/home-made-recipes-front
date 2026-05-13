import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

import { Unit } from '@models/recipes/unit.enum';
import { IngredientRow } from './ingredient-row/ingredient-row';

@Component({
  selector: 'app-recipe-ingredients',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, IngredientRow, TranslatePipe],
  templateUrl: './recipe-ingredients.html',
  styleUrls: ['./recipe-ingredients.scss'],
})
export class RecipeIngredients {
  @Input({ required: true }) ingredients!: FormArray<FormGroup>;

  get ingredientsControls() {
    return this.ingredients.controls as FormGroup[];
  }

  addIngredient() {
    const group = new FormGroup({
      quantity: new FormControl<number | null>(null),
      unit: new FormControl<Unit | null>(null),
      product: new FormControl(null),
    });

    this.ingredients.push(group);
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }
}
