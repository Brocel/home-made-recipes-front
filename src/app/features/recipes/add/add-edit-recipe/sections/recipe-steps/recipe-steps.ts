import { Component, input } from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-steps',
  imports: [],
  templateUrl: './recipe-steps.html',
  styleUrl: './recipe-steps.scss',
})
export class RecipeSteps {
  steps = input.required<FormArray>();
}
