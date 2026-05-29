import { Component, computed, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { INGREDIENT_VALIDATION_MESSAGES } from '@forms/validations/recipe.validation';
import { UnitLongLabel, UnitShortLabel } from '@models/recipes/unit.enum';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSelect } from '@primitives/form/form-select/form-select';
import { ProductAutocomplete } from '@products/product-autocomplete/product-autocomplete';
import { EnumUtilsService } from '@services/enum-utils.service';

@Component({
  selector: 'app-ingredient-row',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormField,
    FormInput,
    FormSelect,
    AppButton,
    ProductAutocomplete,
  ],
  templateUrl: './ingredient-row.html',
  styleUrls: ['./ingredient-row.scss'],
})
export class IngredientRow {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly enumUtils = inject(EnumUtilsService);

  // =========================================================
  // Inputs
  // =========================================================
  readonly group = input.required<FormGroup>();
  readonly submitted = input(false);

  // =========================================================
  // Outputs
  // =========================================================
  readonly remove = output<void>();

  // Transform UnitComposition to SelectOption for form-select
  readonly unitLabels = computed(() =>
    this.enumUtils
      .mapUnit(UnitShortLabel, UnitLongLabel)()
      .map((u) => ({
        value: u.value,
        label: `${u.short} (${u.long})`,
      })),
  );

  protected readonly messages = INGREDIENT_VALIDATION_MESSAGES;
}
