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
import { RecipeTypeLabel, RecipeType } from '@models/recipes/recipe-type.enum';
import { EnumUtilsService } from '@shared/services/enum-utils.service';

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
  @Output() close = new EventEmitter<void>();
  @Output() openCreateFull = new EventEmitter<{ title?: string; type?: string }>();

  private fb: FormBuilder = inject(FormBuilder);
  private enumUtils: EnumUtilsService = inject(EnumUtilsService);

  recipeTypes = this.enumUtils.enumToList(RecipeType, RecipeTypeLabel);

  form = this.fb.nonNullable.group({
    title: this.fb.control<string>(''),
    recipeType: this.fb.control<RecipeType | ''>(''),
  });

  constructor(private router: Router) {}

  submit() {
    const { title, recipeType } = this.form.value;
    const payload = { title: title || undefined, recipeType: recipeType || undefined };

    this.openCreateFull.emit(payload);
    this.router.navigate(['/recipes/create'], { state: payload });
    this.close.emit();
  }
}
