import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';
import { EnumUtilsService } from '@services/enum-utils.service';

import { RecipeSearchFormModel } from '@forms/models/recipe-form.model';
import { IngredientType, IngredientTypeLabel } from '@models/recipes/ingredient-type.enum';
import { RecipeType, RecipeTypeLabel } from '@models/recipes/recipe-type.enum';

@Component({
  selector: 'app-mini-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './mini-search.html',
  styleUrls: ['./mini-search.scss'],
})
export class MiniSearch {
  search = output<Partial<RecipeSearchFormModel>>();
  close = output<void>();

  private fb: FormBuilder = inject(FormBuilder);
  private enumUtils: EnumUtilsService = inject(EnumUtilsService);

  recipeTypes = this.enumUtils.mapEnumLabelsToSelectOption(RecipeTypeLabel);
  ingredientTypes = this.enumUtils.mapEnumLabelsToSelectOption(IngredientTypeLabel);

  form = this.fb.nonNullable.group({
    title: this.fb.control<string>(''),
    recipe_type: this.fb.control<RecipeType[] | []>([]),
    max_prep_time: this.fb.control<number | null>(null),
    ingredient_type: this.fb.control<IngredientType[] | []>([]),
  });

  submit() {
    this.search.emit(this.form.value);
    this.close.emit();
  }
}
