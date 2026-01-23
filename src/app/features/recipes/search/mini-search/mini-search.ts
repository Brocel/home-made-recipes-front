import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

import { RecipeTypeLabel } from '@models/recipes/recipe-type.enum';
import { IngredientTypeLabel } from '@models/recipes/ingredient-type.enum';

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

  private fb: FormBuilder = inject(FormBuilder);

  recipeTypes = Object.entries(RecipeTypeLabel).map(([key, label]) => ({
    value: key,
    label,
  }));
  ingredientTypes = Object.entries(IngredientTypeLabel).map(([key, label]) => ({
    value: key,
    label,
  }));

  form = this.fb.group({
    name: [''],
    recipeType: [''],
    maxTime: [null],
    ingredientType: [''],
  });

  submit() {
    console.log('recipeTypes:', this.recipeTypes);
    console.log('ingredientTypes:', this.ingredientTypes);
    this.search.emit(this.form.value);
  }
}
