import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ProductApi } from '@api/product.api';
import { PRODUCT_VALIDATION_MESSAGES } from '@forms/validations/product.validation';
import { FormLayout } from '@layouts/form-layout/form-layout';
import { Product, ProductDTO } from '@models/recipes/ingredient';
import { IngredientType, IngredientTypeLabel } from '@models/recipes/ingredient-type.enum';
import { AppButton } from '@primitives/app-button/app-button';
import { FormField } from '@primitives/form/form-field/form-field';
import { FormInput } from '@primitives/form/form-input/form-input';
import { FormSection } from '@primitives/form/form-section/form-section';
import { FormSelect } from '@primitives/form/form-select/form-select';
import { EnumUtilsService } from '@services/enum-utils.service';
import { ToasterService } from '@uiServices/toaster.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    FormLayout,
    FormSection,
    FormField,
    FormInput,
    FormSelect,
    AppButton,
  ],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {
  // =========================================================
  // Dependencies
  // =========================================================
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductApi);
  private readonly toast = inject(ToasterService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly enumUtils = inject(EnumUtilsService);

  // =========================================================
  // Inputs
  // =========================================================
  readonly addProductData = input<any>('');

  // =========================================================
  // Outputs
  // =========================================================
  readonly productCreated = output<Product>();
  readonly cancelled = output<void>();

  // =========================================================
  // State
  // =========================================================
  readonly loading = signal(false);
  readonly submitted = signal(false);
  readonly ingredientTypes = this.enumUtils.mapEnumLabelsToSelectOption(IngredientTypeLabel);

  // =========================================================
  // Form
  // =========================================================
  readonly form = this.fb.nonNullable.group({
    name: [this.addProductData()?.name ?? '', Validators.required],
    ingredient_type: [null as IngredientType | null, Validators.required],
  });

  // =========================================================
  // Validation helpers
  // =========================================================
  protected readonly messages = PRODUCT_VALIDATION_MESSAGES;

  // =========================================================
  // Actions
  // =========================================================
  onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const dto: ProductDTO = this.form.getRawValue() as ProductDTO;

    this.productService
      .createProduct(dto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (product: Product) => {
          this.loading.set(false);
          this.productCreated.emit(product);
          this.toast.show('success', 'messages.success.productCreated');
        },
        error: (err) => {
          this.loading.set(false);
          this.toast.show('error', err.errorKey ?? 'UNKNOWN_ERROR');
        },
      });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
