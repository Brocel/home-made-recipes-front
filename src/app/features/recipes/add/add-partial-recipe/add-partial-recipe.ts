import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RECIPE_VALIDATION_MESSAGES } from '@forms/validations/recipe.validation';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { RecipeType, RecipeTypeLabel } from '@models/recipes/recipe-type.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSection } from '@primitives/form/form-section/form-section';
import { FormSelect } from '@primitives/form/form-select/form-select';
import { EnumUtilsService } from '@services/enum-utils.service';
import { RecipeFormService } from '@services/recipe-form.service';

@Component({
  selector: 'app-mini-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    AppButton,
    FormLayout,
    FormSection,
    FormField,
    FormInput,
    FormSelect,
  ],
  templateUrl: './add-partial-recipe.html',
  styleUrls: ['./add-partial-recipe.scss'],
})
export class AddPartialRecipe {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly enumUtils: EnumUtilsService = inject(EnumUtilsService);
  private readonly formService = inject(RecipeFormService);
  private readonly router = inject(Router);

  // =========================================================
  // Outputs
  // =========================================================
  readonly close = output<void>();

  // =========================================================
  // State
  // =========================================================
  readonly loading = signal(false);
  readonly submitted = signal(false);
  readonly recipeTypes = this.enumUtils.mapEnumLabelsToSelectOption(RecipeTypeLabel);

  // =========================================================
  // Form
  // =========================================================
  readonly form = this.fb.nonNullable.group({
    title: this.fb.control<string>(''),
    recipeType: this.fb.control<RecipeType | ''>(''),
  });

  // =========================================================
  // Validation helpers
  // =========================================================
  protected readonly messages = RECIPE_VALIDATION_MESSAGES;

  // =========================================================
  // Actions
  // =========================================================
  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { title, recipeType } = this.form.value;
    const payload = { title: title || undefined, recipe_type: recipeType || undefined };

    this.formService.setPayload(payload);
    this.router.navigate(['/recipes/create']);
    this.close.emit();
    this.loading.set(false);
    this.submitted.set(false);
  }
}
