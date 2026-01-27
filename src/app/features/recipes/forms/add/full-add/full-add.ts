import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeFormService } from '@services/recipe-form.service';
import { RecipeInfo } from './sections/recipe-info/recipe-info';
import { RecipeIngredients } from './sections/recipe-ingredients/recipe-ingredients';
import { RecipeSteps } from './sections/recipe-steps/recipe-steps';
import { RecipeType } from '@models/recipes/recipe-type.enum';

@Component({
  selector: 'app-full-add',
  imports: [ReactiveFormsModule, RecipeInfo, RecipeIngredients, RecipeSteps, TranslatePipe],
  templateUrl: './full-add.html',
  styleUrl: './full-add.scss',
})
export class FullAdd implements OnInit {
  private router = inject(Router);
  private formService = inject(RecipeFormService);

  form!: FormGroup;

  get ingredient_list(): FormArray {
    return this.formService.ingredientsArray;
  }
  get step_list(): FormArray {
    return this.formService.stepsArray;
  }

  ngOnInit() {
    this.formService.createForm();
    this.form = this.formService.recipeForm;
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { title?: string; recipe_type?: string };
    if (state) {
      this.formService.patchStateValue(state);
    }
  }

  submit() {
    if (this.form.invalid) return;
    const dto = this.formService.toDto();

    // TODO: call to api
  }
}
