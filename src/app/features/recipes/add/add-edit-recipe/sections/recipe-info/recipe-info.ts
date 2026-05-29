import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { RECIPE_VALIDATION_MESSAGES } from '@forms/validations/recipe.validation';
import { RecipeTypeLabel } from '@models/recipes/recipe-type.enum';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSection } from '@primitives/form/form-section/form-section';
import { FormSelect } from '@primitives/form/form-select/form-select';
import { FormTextarea } from '@primitives/form/form-textarea/form-textarea';
import { EnumUtilsService } from '@services/enum-utils.service';

@Component({
  selector: 'app-recipe-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormSection,
    FormField,
    FormInput,
    FormSelect,
    FormTextarea,
  ],
  templateUrl: './recipe-info.html',
  styleUrls: ['./recipe-info.scss'],
})
export class RecipeInfo {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly enumUtils = inject(EnumUtilsService);

  // =========================================================
  // Inputs
  // =========================================================
  readonly informations = input.required<FormGroup>();
  readonly submitted = input(false);

  // Transform RecipeType enum to SelectOption for form-select
  readonly recipeTypes = this.enumUtils.mapEnumLabelsToSelectOption(RecipeTypeLabel);

  protected readonly messages = RECIPE_VALIDATION_MESSAGES;
}
