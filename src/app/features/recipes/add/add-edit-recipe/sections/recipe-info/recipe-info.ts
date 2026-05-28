import { Component, inject, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';

import { RecipeType, RecipeTypeLabel } from '@models/recipes/recipe-type.enum';
import { EnumUtilsService } from '@services/enum-utils.service';

@Component({
  selector: 'app-recipe-info',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './recipe-info.html',
  styleUrls: ['./recipe-info.scss'],
})
export class RecipeInfo {
  private readonly enumUtils = inject(EnumUtilsService);

  informations = input.required<FormGroup>();

  recipeTypes = this.enumUtils.enumToList(RecipeType, RecipeTypeLabel);
}
