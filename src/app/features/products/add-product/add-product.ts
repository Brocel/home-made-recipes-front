import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '@ngx-translate/core';

import { ProductApi } from '@api/product.api';
import { Product, ProductDTO } from '@models/recipes/ingredient';
import { IngredientType } from '@models/recipes/ingredient-type.enum';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss'],
})
export class AddProduct {
  private dialogRef = inject(MatDialogRef<AddProduct>);
  private data = inject<{ name: string }>(MAT_DIALOG_DATA);
  private productService = inject(ProductApi);

  ingredientTypes = Object.values(IngredientType);

  form = new FormGroup({
    name: new FormControl<string>(this.data.name ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ingredient_type: new FormControl<IngredientType | null>(null, {
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.form.invalid) return;

    const dto: ProductDTO = this.form.getRawValue() as ProductDTO;

    this.productService.createProduct(dto).subscribe((product: Product) => {
      this.dialogRef.close(product);
    });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
