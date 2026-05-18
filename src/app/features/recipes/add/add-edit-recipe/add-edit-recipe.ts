import { Component, effect, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { RecipeCreateBridgeService } from '@services/recipe-create-bridge.service';
import { RecipeFormService } from '@services/recipe-form.service';
import { ScrollWrapper } from '../../../../shared/components/layout/scroll-wrapper/scroll-wrapper';
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
  private formService = inject(RecipeFormService);
  private bridge = inject(RecipeCreateBridgeService);

  form!: FormGroup;

  bridgeEffect = effect(() => {
    const payload = this.bridge.payload();
    if (payload) {
      this.formService.patchStateValue(payload);
      this.bridge.clear();
    }
  });

  get ingredient_list(): FormArray {
    return this.formService.ingredientsArray;
  }
  get step_list(): FormArray {
    return this.formService.stepsArray;
  }

  ngOnInit() {
    this.form = this.formService.createForm();
  }

  submit() {
    if (this.form.invalid) return;
    const dto = this.formService.toDto();

    // TODO: call to api
  }
}
