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
import { RecipeCreateBridgeService } from '@services/recipe-create-bridge.service';

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
  templateUrl: './mini-add.html',
  styleUrls: ['./mini-add.scss'],
})
export class MiniAdd {
  @Output() close = new EventEmitter<void>();

  private fb: FormBuilder = inject(FormBuilder);
  private enumUtils: EnumUtilsService = inject(EnumUtilsService);
  private bridge: RecipeCreateBridgeService = inject(RecipeCreateBridgeService);
  private router = inject(Router);

  recipeTypes = this.enumUtils.enumToList(RecipeType, RecipeTypeLabel);

  form = this.fb.nonNullable.group({
    title: this.fb.control<string>(''),
    recipeType: this.fb.control<RecipeType | ''>(''),
  });

  submit() {
    const { title, recipeType } = this.form.value;
    const payload = { title: title || undefined, recipe_type: recipeType || undefined };

    this.bridge.setPayload(payload);

    this.router.navigate(['/recipes/create']);

    this.close.emit();
  }
}
