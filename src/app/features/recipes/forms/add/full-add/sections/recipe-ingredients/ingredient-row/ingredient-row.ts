import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ProductAutocomplete } from '@forms/product-autocomplete/product-autocomplete';
import { Unit, UnitShortLabel } from '@models/recipes/unit.enum';

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
  ],
  templateUrl: './ingredient-row.html',
  styleUrls: ['./ingredient-row.scss'],
})
export class IngredientRow {
  @Input({ required: true }) group!: FormGroup;
  @Output() remove = new EventEmitter<void>();

  units = Object.values(Unit);
  unitLabels = UnitShortLabel;
}
