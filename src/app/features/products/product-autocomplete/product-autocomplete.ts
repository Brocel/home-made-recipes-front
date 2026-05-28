import { Component, computed, forwardRef, inject, Input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { ProductApi } from '@api/product.api';
import { Product } from '@models/recipes/ingredient';
import { TranslatePipe } from '@ngx-translate/core';
import { AddProduct } from '../add-product/add-product';

@Component({
  selector: 'app-product-autocomplete',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule, // TODO: refacto with autocomplete primitive
    MatIconModule,
    TranslatePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductAutocomplete),
      multi: true,
    },
  ],
  templateUrl: './product-autocomplete.html',
  styleUrls: ['./product-autocomplete.scss'],
})
export class ProductAutocomplete implements ControlValueAccessor {
  @Input() label = 'feature.products.product-autocomplete.label';

  private dialog = inject(MatDialog);
  private productService = inject(ProductApi);

  control = new FormControl<string>('');

  // Valeur sélectionnée (Product)
  private _value = signal<Product | null>(null);

  // Résultats de recherche
  results = signal<Product[]>([]);

  // Afficher "Créer X" si aucun résultat
  showCreate = computed(() => this.control.value?.length! >= 3 && this.results().length === 0);

  constructor() {
    // Recherche API
    this.control.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.productService.searchProducts(value ?? '')),
      )
      .subscribe((products) => this.results.set(products));
  }

  // ControlValueAccessor
  onChange = (value: Product | null) => {};
  onTouched = () => {};

  writeValue(value: Product | null): void {
    this._value.set(value);
    this.control.setValue(value?.name ?? '', { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  selectProduct(product: Product) {
    this._value.set(product);
    this.control.setValue(product.name, { emitEvent: false });
    this.onChange(product);
  }

  createProduct() {
    const name = this.control.value ?? '';

    const dialogRef = this.dialog.open(AddProduct, {
      data: { name },
    });

    dialogRef.afterClosed().subscribe((product: Product | null) => {
      if (product) {
        this.selectProduct(product);
      }
    });
  }
}
