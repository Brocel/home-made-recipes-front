import { Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-ingredients',
  imports: [],
  templateUrl: './recipe-ingredients.html',
  styleUrl: './recipe-ingredients.scss',
})
export class RecipeIngredients {
  @Input() ingredients!: FormArray;
}
