import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RecipeDTO } from '@models/recipes/recipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'recipe-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './recipe-search.html',
  styleUrls: ['./recipe-search.scss'],
})
export class RecipeSearch {
  // TODO: implement in dedicated User Story
  private readonly fb: FormBuilder = inject(FormBuilder);

  submitAdvanced = output<Partial<RecipeDTO>>();
  form = this.fb.group({
    name: [''],
    ingredients: [''],
    maxCookingTime: [''],
  });

  submit() {
    this.submitAdvanced.emit(this.form.value as Partial<RecipeDTO>);
  }
}
