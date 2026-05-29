import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { RecipeType, RecipeTypeLabel } from '@models/recipes/recipe-type.enum';
import { TranslatePipe } from '@ngx-translate/core';
import { EnumUtilsService } from '@services/enum-utils.service';
import { RecipeFormService } from '@services/recipe-form.service';

@Component({
  selector: 'app-mini-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './add-partial-recipe.html',
  styleUrls: ['./add-partial-recipe.scss'],
})
export class AddPartialRecipe {
  @Output() close = new EventEmitter<void>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly enumUtils: EnumUtilsService = inject(EnumUtilsService);
  private readonly formService = inject(RecipeFormService);
  private readonly router = inject(Router);

  recipeTypes = this.enumUtils.mapEnumLabelsToSelectOption(RecipeType, RecipeTypeLabel);

  form = this.fb.nonNullable.group({
    title: this.fb.control<string>(''),
    recipeType: this.fb.control<RecipeType | ''>(''),
  });

  submit() {
    const { title, recipeType } = this.form.value;
    const payload = { title: title || undefined, recipe_type: recipeType || undefined };

    this.formService.setPayload(payload);

    this.router.navigate(['/recipes/create']);

    this.close.emit();
  }
}
