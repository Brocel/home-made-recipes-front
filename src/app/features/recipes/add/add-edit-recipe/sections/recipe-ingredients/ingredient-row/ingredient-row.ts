import { Component, inject, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';

import { Unit, UnitLongLabel, UnitShortLabel } from '@models/recipes/unit.enum';
import { ProductAutocomplete } from '@products/product-autocomplete/product-autocomplete';
import { EnumUtilsService } from '@services/enum-utils.service';

@Component({
  selector: 'app-ingredient-row',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ProductAutocomplete,
    TranslatePipe,
  ],
  templateUrl: './ingredient-row.html',
  styleUrls: ['./ingredient-row.scss'],
})
export class IngredientRow {
  private readonly enumUtils: EnumUtilsService = inject(EnumUtilsService);

  group = input.required<FormGroup>();
  remove = output<void>();

  unitLabels = this.enumUtils.enumToShortAndLongLabels(Unit, UnitShortLabel, UnitLongLabel);
}
