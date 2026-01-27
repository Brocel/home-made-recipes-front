import { Component, inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

import { EnumUtilsService } from '@services/enum-utils.service';
import { RecipeType, RecipeTypeLabel } from '@models/recipes/recipe-type.enum';

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
  private enumUtils = inject(EnumUtilsService);


  @Input() form!: FormGroup;

  recipeTypes = this.enumUtils.enumToList(RecipeType, RecipeTypeLabel);

}
