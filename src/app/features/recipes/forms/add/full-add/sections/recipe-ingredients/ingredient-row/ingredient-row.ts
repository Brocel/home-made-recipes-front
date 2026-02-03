import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductAutocomplete } from '@forms/product-autocomplete/product-autocomplete';
import { Unit, UnitShortLabel, UnitLongLabel } from '@models/recipes/unit.enum';
import { EnumUtilsService } from '@shared/services/enum-utils.service';

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
  @Input({ required: true }) group!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  private enumUtils: EnumUtilsService = inject(EnumUtilsService);



  unitLabels = this.enumUtils.enumToShortAndLongLabels(Unit, UnitShortLabel, UnitLongLabel);
}
