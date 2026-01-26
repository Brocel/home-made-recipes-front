import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RecipeTypeLabel } from '@models/recipes/recipe-type.enum';

@Component({
  selector: 'app-add-recipe-mini',
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
  templateUrl: './add-recipe-mini.html',
  styleUrls: ['./add-recipe-mini.scss'],
})
export class AddRecipeMini {
  private fb: FormBuilder = inject(FormBuilder);

  title: string = '';
  type: string = '';

  recipeTypes = Object.entries(RecipeTypeLabel).map(([value, label]) => ({ value, label }));

  form = this.fb.nonNullable.group({
    title: this.fb.control<string>(''),
    recipeType: this.fb.control<string>('')
  });

  @Output() openCreateFull = new EventEmitter<{ title?: string; type?: string }>();

  constructor(private router: Router) {}

  submit() {
    const payload = { title: this.title || undefined, type: this.type || undefined };
    this.openCreateFull.emit(payload);
    this.router.navigate(['/recipes/create'], { state: payload });
  }
}
