import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Product, ProductDTO } from '@models/recipes/ingredient';
import { IngredientType } from '@models/recipes/ingredient-type.enum';
import { ProductService } from '@services/product.service';

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
  ],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.scss'],
})
export class AddProduct {
  private dialogRef = inject(MatDialogRef<AddProduct>);
  private data = inject<{ name: string }>(MAT_DIALOG_DATA);
  private productService = inject(ProductService);

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
