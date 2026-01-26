import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { EnumUtilsService } from '@shared/services/enum-utils.service';

import { RecipeTypeLabel, RecipeType } from '@models/recipes/recipe-type.enum';
import { IngredientTypeLabel, IngredientType } from '@models/recipes/ingredient-type.enum';

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
  @Output() search = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  private fb: FormBuilder = inject(FormBuilder);
  private enumUtils: EnumUtilsService = inject(EnumUtilsService);

  recipeTypes = this.enumUtils.enumToList(RecipeType, RecipeTypeLabel);
  ingredientTypes = this.enumUtils.enumToList(IngredientType, IngredientTypeLabel);

  form = this.fb.nonNullable.group({
    name: this.fb.control<string>(''),
    recipeType: this.fb.control<RecipeType[] | []>([]),
    maxTime: this.fb.control<number | null>(null),
    ingredientType: this.fb.control<IngredientType[] | []>([]),
  });

  submit() {
    this.search.emit(this.form.value);
    this.close.emit();
  }
}
