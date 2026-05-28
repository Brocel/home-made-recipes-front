import { Component, effect, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeFormService } from '@services/recipe-form.service';
import { ScrollWrapper } from '../../../../ui/overlays/scroll-wrapper/scroll-wrapper';
import { RecipeInfo } from './sections/recipe-info/recipe-info';
import { RecipeIngredients } from './sections/recipe-ingredients/recipe-ingredients';
import { RecipeSteps } from './sections/recipe-steps/recipe-steps';

@Component({
  selector: 'app-full-add',
  imports: [
    ReactiveFormsModule,
    RecipeInfo,
    RecipeIngredients,
    RecipeSteps,
    TranslatePipe,
    MatIcon,
    ScrollWrapper,
  ],
  templateUrl: './add-edit-recipe.html',
  styleUrl: './add-edit-recipe.scss',
})
export class AddEditRecipe implements OnInit {
  private readonly formService = inject(RecipeFormService);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.formService.createForm();
  }

  formServiceEffect = effect(() => {
    const payload = this.formService.payload();
    if (payload) {
      this.formService.patchStateValue(this.form, payload);
      this.formService.clearPayload();
    }
  });

  get ingredient_list(): FormArray {
    return this.form.get('ingredient_list') as FormArray;
  }
  get step_list(): FormArray {
    return this.form.get('step_list') as FormArray;
  }

  submit() {
    if (this.form.invalid) return;
    const dto = this.formService.toDto(this.form);

    // TODO: call to api
  }
}
